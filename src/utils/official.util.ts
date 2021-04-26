import { HttpService, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { createHash } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Redis } from 'ioredis';
import { join } from 'path';
import { ACCESS_TOKEN_CONFIG_PROVIDER, OPTIONS_PROVIDER, REDIS_CLIENT_PROVIDER } from '../constants/common.constant';
import { OFFICIAL_GET_ACCESS_TOKEN_URL } from '../constants/official.constant';
import { ACCESS_TOKEN_REDIS_KEY } from '../constants/redis.constant';
import { AccessTokenConfig } from '../interfaces/access-token.interface';
import { OfficialModuleOptions } from '../interfaces/options.interface';
import { OfficialGetAccessTokenResponse } from '../interfaces/response/official/get-access-token.official.response.interface';

@Injectable()
export class OfficialUtil implements OnModuleInit {
  constructor(
    @Inject(OPTIONS_PROVIDER)
    private readonly options: OfficialModuleOptions,
    @Inject(ACCESS_TOKEN_CONFIG_PROVIDER)
    private readonly accessTokenConfig: AccessTokenConfig,
    @Inject(REDIS_CLIENT_PROVIDER)
    private readonly redisClient: Redis,
    private readonly httpService: HttpService
  ) {}

  /** access token 本地存储文件路径 */
  private readonly accessTokenFileName = './access_token.txt';

  async onModuleInit() {
    if (this.redisClient) {
      const accessToken = await this.redisClient.get(ACCESS_TOKEN_REDIS_KEY);
      if (!accessToken) return await this.renewAccessToken();
    } else {
      const exist = existsSync(join(__dirname, this.accessTokenFileName));
      if (exist) {
        const fileContent = readFileSync(join(__dirname, this.accessTokenFileName)).toString();
        const options: AccessTokenConfig = JSON.parse(fileContent);
        if (options.expiresAt > Date.now() + 60 * 1000) {
          //1分钟富裕时间
          this.accessTokenConfig.token = options.token;
          this.accessTokenConfig.expiresAt = options.expiresAt;
          return;
        }
      }

      await this.renewAccessToken();
    }
  }

  /** 获取Access Token */
  async getAccessToken(): Promise<string> {
    if (this.redisClient) {
      const accessToken = await this.redisClient.get(ACCESS_TOKEN_REDIS_KEY);
      return accessToken ?? this.renewAccessToken();
    }

    if (!this.accessTokenConfig || !this.accessTokenConfig.token || this.accessTokenConfig.expiresAt < Date.now() + 60 * 1000) {
      return this.renewAccessToken();
    }

    return this.accessTokenConfig.token;
  }

  /**
   * 签名校验
   * @param timestamp 微信调用时间戳
   * @param nonce 微信调用随机字符串
   * @param signature 微信签名信息
   * @param encryptMsg 微信加密信息
   * @returns 签名校验成功与否
   */
  checkSignature(timestamp: string, nonce: string, signature: string, encryptMsg?: string): boolean {
    const tempStr = [this.options.authToken, timestamp, nonce, encryptMsg].sort().join('');

    return createHash('sha1').update(tempStr, 'utf8').digest('hex') === signature;
  }

  /** 重新获取access token */
  private async renewAccessToken(): Promise<string> {
    const { data } = await this.httpService
      .get<OfficialGetAccessTokenResponse>(OFFICIAL_GET_ACCESS_TOKEN_URL, {
        params: {
          appid: this.options.appId,
          secret: this.options.appSecret,
          grant_type: 'client_credential'
        }
      })
      .toPromise();

    if (!data || data.errcode) throw new Error(`Get access token failed and error code is ${data.errcode} error message is ${data.errmsg}`);

    if (this.redisClient) {
      await this.redisClient.setex(ACCESS_TOKEN_REDIS_KEY, data.expires_in, data.access_token);
    } else {
      const fileContent = JSON.stringify({ token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 });
      writeFileSync(join(__dirname, this.accessTokenFileName), fileContent);
      this.accessTokenConfig.token = data.access_token;
      this.accessTokenConfig.expiresAt = Date.now() + data.expires_in * 1000;
    }

    return data.access_token;
  }
}

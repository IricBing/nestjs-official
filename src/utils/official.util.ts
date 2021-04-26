import { HttpService, Inject, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { Redis } from 'ioredis';
import { ACCESS_TOKEN_CONFIG_PROVIDER, OPTIONS_PROVIDER, REDIS_CLIENT_PROVIDER } from '../constants/common.constant';
import { AccessTokenConfig } from '../interfaces/access-token.interface';
import { OfficialModuleOptions } from '../interfaces/options.interface';

@Injectable()
export class OfficialUtil {
  constructor(
    @Inject(OPTIONS_PROVIDER)
    private readonly options: OfficialModuleOptions,
    @Inject(ACCESS_TOKEN_CONFIG_PROVIDER)
    private readonly accessTokenConfig: AccessTokenConfig,
    @Inject(REDIS_CLIENT_PROVIDER)
    private readonly redisClient: Redis,
    private readonly httpService: HttpService
  ) {}

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
}

import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { RedisModuleOptions } from 'nestjs-redis';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  /** 微信公众号配置 */
  get official() {
    return {
      /** 微信公众号 AppId */
      appId: this.nestConfigService.get<string>('official.appId'),
      /** 微信公众号 AppSecret */
      appSecret: this.nestConfigService.get<string>('official.appSecret'),
      /** 公众号服务器配置Token */
      authToken: this.nestConfigService.get<string>('official.authToken'),
      /** 公众号服务器配置消息加密解密密钥 */
      encodingAESKey: this.nestConfigService.get<string>('official.encodingAESKey')
    };
  }

  /** redis数据库配置 */
  get redis() {
    return {
      /** 公众号存储数据库配置 */
      official: this.redisOfficialConfig()
    };
  }

  private redisOfficialConfig(): RedisModuleOptions {
    return {
      /** 自定义服务名称 */
      name: this.nestConfigService.get<string>('redis.official.name'),
      /** 数据库Host */
      host: this.nestConfigService.get<string>('redis.official.host'),
      /** 数据库端口 */
      port: this.nestConfigService.get<number>('redis.official.port'),
      /** 数据库编号0-15 */
      db: this.nestConfigService.get<number>('redis.official.db'),
      /** 登录密码 */
      password: this.nestConfigService.get<string>('redis.official.password'),
      /** Key前缀 */
      keyPrefix: this.nestConfigService.get<string>('redis.official.keyPrefix')
    };
  }
}

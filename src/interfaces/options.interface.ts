import { ModuleMetadata, Type } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

/** 同步传入配置 */
export interface OfficialModuleOptions {
  /** 公众号AppId */
  appId: string;
  /** 公众号AppSecret */
  appSecret: string;
  /** 公众号服务器配置Token */
  authToken?: string;
  /** 公众号服务器配置消息加密解密密钥 */
  encodingAESKey?: string;
  /** Redis配置 */
  redisOptions?: RedisOptions;
}

export interface OfficialOptionsFactory {
  createOfficialOptions(): OfficialModuleOptions | Promise<OfficialModuleOptions>;
}

/** 异步传入配置 */
export interface OfficialModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OfficialOptionsFactory>;
  useClass?: Type<OfficialOptionsFactory>;
  useFactory?: (...args: any[]) => OfficialModuleOptions | Promise<OfficialModuleOptions>;
  inject?: any[];
}

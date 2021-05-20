/** 配置Provider */
export const OPTIONS_PROVIDER = Symbol('OPTIONS_PROVIDER');

/** Access Token 配置Provider */
export const ACCESS_TOKEN_CONFIG_PROVIDER = Symbol('ACCESS_TOKEN_CONFIG_PROVIDER');

/** JSSDK Ticket 配置 Provider */
export const JSSDK_TICKET_PROVIDER = Symbol('JSSDK_TICKET_PROVIDER');

/** Redis Client Provider */
export const REDIS_CLIENT_PROVIDER = Symbol('REDIS_CLIENT_PROVIDER');

/** XML Builder Provider */
export const XML_BUILDER_PROVIDER = Symbol('XML_BUILDER_PROVIDER');

/** 方法类型 */
export const enum FunctionType {
  /** 同步 */
  Sync = 'sync',
  /** 异步 */
  Async = 'async'
}

/** Buffer编码类型 */
export const enum BufferEncodingType {
  /** base64格式 */
  BASE64 = 'base64',
  /** hex格式 */
  HEX = 'hex',
  /** binary格式 */
  BINARY = 'binary'
}

/** 加密方式列表 */
export const enum EncryptType {
  /** ase 256加密 */
  ASE256CBC = 'aes-256-cbc'
}

/** 微信语言版本 */
export const enum OfficialLanguageType {
  /** 简体 */
  ZH_CN = 'zh_CN',
  /** 繁体 */
  ZH_TW = 'zh_TW',
  /** 英语 */
  EN = 'en'
}

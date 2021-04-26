/** 配置Provider */
export const OPTIONS_PROVIDER = Symbol('OPTIONS_PROVIDER');

/** Access Token 配置Provider */
export const ACCESS_TOKEN_CONFIG_PROVIDER = Symbol('ACCESS_TOKEN_CONFIG_PROVIDER');

/** JSSDK Ticket 配置 Provider */
export const JSSDK_TICKET_PROVIDER = Symbol('JSSDK_TICKET_PROVIDER');

/** Redis Client Provider */
export const REDIS_CLIENT_PROVIDER = Symbol('REDIS_CLIENT_PROVIDER');

/** 方法类型 */
export const enum FunctionType {
  /** 同步 */
  Sync = 'sync',
  /** 异步 */
  Async = 'async'
}

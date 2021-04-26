/** Access Token 配置信息 */
export interface AccessTokenConfig {
  /** Access Token 内容 */
  token: string;

  /** 到期时间戳 */
  expiresAt: number;
}

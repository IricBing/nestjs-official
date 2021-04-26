import { OfficialBaseResponse } from './base.official.response.interface';

/** 获取公众号Access Token返回类型 */
export interface OfficialGetAccessTokenResponse extends OfficialBaseResponse {
  /** Access Token */
  access_token: string;
  /** 有效期，默认7200秒，即两小时 */
  expires_in?: 7200;
}

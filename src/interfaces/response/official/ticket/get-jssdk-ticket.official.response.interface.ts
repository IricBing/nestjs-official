import { OfficialBaseResponse } from '../base.official.response.interface';

/** 获取公众号JSSDK Ticket返回类型 */
export interface OfficialGetJSSDKTicketResponse extends OfficialBaseResponse {
  /** JS-Ticket */
  ticket: string;
  /** 有效期，默认7200秒，即两小时 */
  expires_in?: 7200;
}

/** http请求微信服务器返回基础字段 */
export interface OfficialBaseResponse {
  /** 错误码 */
  errcode: number;

  /** 错误信息 */
  errmsg?: string;
}

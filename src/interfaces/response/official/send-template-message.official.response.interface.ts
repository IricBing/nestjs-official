import { OfficialBaseResponse } from './base.official.response.interface';

/** 公众号发送模板消息返回类型 */
export interface OfficialSendTemplateMessageResponse extends OfficialBaseResponse {
  /** 模板消息ID */
  readonly msgid?: number;
}

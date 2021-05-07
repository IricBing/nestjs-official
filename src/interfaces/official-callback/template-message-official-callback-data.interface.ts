import { OfficialCallbackBaseData } from './official-callback-base-data.interface';

/**
 * 微信公众号模板消息回调内容
 * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#6
 */
export interface TemplateMessageOfficialCallbackData extends OfficialCallbackBaseData {
  /** 模板消息ID */
  MsgID: string;

  /** 发送状态，成功为success，失败举例：failed:user block */
  Status: string;
}

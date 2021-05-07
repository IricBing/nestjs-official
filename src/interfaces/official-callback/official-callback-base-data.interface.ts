import { OfficialCallbackEventType, OfficialCallbackMessageType } from '../../constants/official.constant';

/** 微信公众号回调消息基础类型 */
export interface OfficialCallbackBaseData {
  /** 微信公众号回调消息类型 */
  MsgType: OfficialCallbackMessageType;

  /** 开发者微信号？ */
  ToUserName: string;

  /** 消息发送人的openId */
  FromUserName: string;

  /** 创建时间戳，字符串类型的数字，精确到秒，10位长度 */
  CreateTime: string;

  /** 微信公众号回调事件类型 */
  Event?: OfficialCallbackEventType;
}

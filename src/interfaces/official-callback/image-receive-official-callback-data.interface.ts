import { OfficialCallbackBaseData } from './official-callback-base-data.interface';

/** 用户向公众号发送图片内容 */
export interface ImageReceiveOfficialCallbackData extends OfficialCallbackBaseData {
  /** 发送图片的URL地址 */
  PicUrl: string;

  /** 用户发送的消息 */
  Content: string;

  /** 消息ID */
  MsgId: string;

  /** 媒体信息ID */
  MediaId: string;
}

import { OfficialCallbackBaseData } from './official-callback-base-data.interface';

/** 用户向公众号发送文本内容 */
export interface TextReceiveOfficialCallbackData extends OfficialCallbackBaseData {
  /** 用户发送的消息 */
  Content: string;

  /** 菜单ID */
  MenuId: string;
}

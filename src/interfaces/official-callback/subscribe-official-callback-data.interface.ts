import { OfficialCallbackBaseData } from './official-callback-base-data.interface';

/** 用户订阅公众号回调内容 */
export interface SubscribeOfficialCallbackData extends OfficialCallbackBaseData {
  /** 关注回调key（实际开发中得到的均为空字符串） */
  EventKey: string;
}

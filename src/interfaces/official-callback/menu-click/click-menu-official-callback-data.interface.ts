import { OfficialCallbackBaseData } from '../official-callback-base-data.interface';

/** 用户点击CLICK类型公众号菜单回调内容 */
export interface ClickMenuOfficialCallbackData extends OfficialCallbackBaseData {
  /** 事件KEY值，与自定义菜单接口中KEY值对应 */
  EventKey: string;
}

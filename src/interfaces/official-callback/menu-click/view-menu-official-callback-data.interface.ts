import { OfficialCallbackBaseData } from '../official-callback-base-data.interface';

/** 用户点击VIEW类型公众号菜单回调内容 */
export interface ViewMenuOfficialCallbackData extends OfficialCallbackBaseData {
  /** 事件KEY值，与自定义菜单接口中KEY值对应 */
  EventKey: string;

  /** 指菜单ID，如果是个性化菜单，则可以通过这个字段，知道是哪个规则的菜单被点击了。 */
  MenuID: string;
}

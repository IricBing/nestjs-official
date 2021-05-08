import { OfficialCallbackBaseData } from '../official-callback-base-data.interface';

/** 用户点击跳转小程序类型公众号菜单回调内容 */
export interface ViewMiniprogramMenuOfficialCallbackData extends OfficialCallbackBaseData {
  /** 事件KEY值，跳转的小程序路径 */
  EventKey: string;

  /** 菜单ID，如果是个性化菜单，则可以通过这个字段，知道是哪个规则的菜单被点击了 */
  MenuID: string;
}

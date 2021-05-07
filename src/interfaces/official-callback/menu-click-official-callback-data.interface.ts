import { OfficialCallbackBaseData } from './official-callback-base-data.interface';

/** 用户点击公众号菜单回调内容 */
export interface MenuClickOfficialCallbackData extends OfficialCallbackBaseData {
  /** VIEW菜单URL地址或CLICK菜单自定义KEY */
  EventKey: string;

  /** 菜单ID */
  MenuId: string;
}

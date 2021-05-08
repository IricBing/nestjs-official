import { OfficialMenuButtonType } from '../constants/official.constant';

/** 二级菜单按钮 */
export interface OfficialMenuSubButton {
  /** 菜单的响应动作类型 */
  type: OfficialMenuButtonType;
  /** 菜单标题，不超过60个字节 */
  name: string;
  /**
   * 菜单KEY值，用于消息接口推送，不超过`128`字节
   * click等点击类型必须
   */
  key?: string;
  /**
   * 网页 链接，用户点击菜单可打开链接，不超过`1024`字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url。
   * view、miniprogram类型必须
   */
  url?: string;
  /**
   * 调用新增永久素材接口返回的合法media_id
   * media_id类型和view_limited类型必须
   */
  media_id?: string;
  /**
   * 小程序的appid（仅认证公众号可配置）
   * miniprogram类型必须
   */
  appid?: string;
  /**
   * 小程序的页面路径
   * miniprogram类型必须
   */
  pagepath?: string;
}

/** 一级菜单按钮 */
export interface OfficialMenuButton {
  /** 菜单的响应动作类型 */
  type: OfficialMenuButtonType;
  /** 菜单标题，不超过16个字节 */
  name: string;
  /**
   * 菜单KEY值，用于消息接口推送，不超过`128`字节
   * click等点击类型必须
   */
  key?: string;
  /**
   * 网页 链接，用户点击菜单可打开链接，不超过`1024`字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url。
   * view、miniprogram类型必须
   */
  url?: string;
  /**
   * 调用新增永久素材接口返回的合法media_id
   * media_id类型和view_limited类型必须
   */
  media_id?: string;
  /**
   * 小程序的appid（仅认证公众号可配置）
   * miniprogram类型必须
   */
  appid?: string;
  /**
   * 小程序的页面路径
   * miniprogram类型必须
   */
  pagepath?: string;
  /** 二级菜单按钮列表 */
  sub_button?: OfficialMenuSubButton[];
}

/** 公众号菜单类型 */
export interface OfficialMenu {
  /** 一级菜单列表 */
  button: OfficialMenuButton[];
}

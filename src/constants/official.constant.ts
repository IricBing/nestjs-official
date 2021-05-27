/**
 * 获取Access Token接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
export const OFFICIAL_GET_ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token';

/**
 * 创建公众号自定义菜单接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
 * @example https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}
 */
export const OFFICIAL_CREATE_MENU_URL = 'https://api.weixin.qq.com/cgi-bin/menu/create';

/**
 * 删除公众号个性化菜单接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Deleting_Custom-Defined_Menu.html
 * @example https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${accessToken}
 */
export const OFFICIAL_DELETE_MENU_URL = 'https://api.weixin.qq.com/cgi-bin/menu/delete';

/**
 * 获取公众号自定义菜单接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Querying_Custom_Menus.html
 * @example https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}
 */
export const OFFICIAL_GET_MENU_URL = 'https://api.weixin.qq.com/cgi-bin/menu/get';

/**
 * 创建公众号个性化菜单接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Personalized_menu_interface.html#0
 * @example https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=${accessToken}
 */
export const OFFICIAL_CREATE_CUSTOM_MENU_URL = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional';

/**
 * 获取JSSDK ticket接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
 * @example https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi
 */
export const OFFICIAL_GET_JSSDK_TICKET_URL = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket';

/**
 * 网页授权时通过code换取access_token
 * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#1
 * @example https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appSecret}&code=${code}&grant_type=authorization_code
 */
export const OFFICIAL_GET_USER_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token';

/**
 * 网页授权作用域为snsapi_userinfo时，通过此接口拉取用户信息
 * @see https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#3
 * @example https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN
 * @description 此处的accessToken与基础的accessToken不是一个东西！！！是用户的accessToken
 */
export const OFFICIAL_GET_USER_INFO_BY_TOKEN_URL = 'https://api.weixin.qq.com/sns/userinfo';

/**
 * 根据openId获取用户信息
 * @see https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
 * @example https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=zh_CN
 */
export const OFFICIAL_GET_USER_INFO_BY_OPEN_ID_URL = 'https://api.weixin.qq.com/cgi-bin/user/info';

/**
 * 根据openId批量获取用户信息
 * @see https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
 * @example https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=${accessToken}&openid=${openid}&lang=zh_CN
 */
export const OFFICIAL_BATCH_GET_USER_INFO_BY_OPEN_ID_URL = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget';

/**
 * 获取关注用户的openid列表
 * @see https://developers.weixin.qq.com/doc/offiaccount/User_Management/Getting_a_User_List.html
 * @example https://api.weixin.qq.com/cgi-bin/user/get?access_token=${accessToken}&next_openid=${nextOpenid}
 */
export const OFFICIAL_GET_USER_OPENID_LIST_URL = 'https://api.weixin.qq.com/cgi-bin/user/get';

/**
 * 发送模板消息接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html
 * @example https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}
 */
export const OFFICIAL_SEND_TEMPLATE_MESSAGE_URL = 'https://api.weixin.qq.com/cgi-bin/message/template/send';

/**
 * 调用公众号后台生成短链接接口
 * @example https://api.weixin.qq.com/cgi-bin/shorturl?access_token=${accessToken}
 */
export const OFFICIAL_GENERATE_SHORT_URL_URL = 'https://api.weixin.qq.com/cgi-bin/shorturl?access_token=';

/**
 * 公众号OAuth2获取用户信息接口
 * @example https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=${scop}&state=${state}#wechat_redirect
 */
export const OFFICIAL_OAUTH2_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize';

/** 公众号返回状态码 */
export const enum OfficialResponseCode {
  /** 成功 */
  Success = 'SUCCESS',
  /** 失败 */
  Fail = 'FAIL'
}

/**
 * 公众号菜单按钮类型
 * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
 */
export enum OfficialMenuButtonType {
  /**
   * 跳转URL用户点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，
   * 可与网页授权获取用户基本信息接口结合，获得用户基本信息。
   */
  View = 'view',
  /**
   * 点击推事件用户点击click类型按钮后，微信服务器会通过消息接口推送消息类型为event的结构给开发者（参考消息接口指南），
   * 并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互；
   */
  Click = 'click',
  /** 小程序类型，公众号开发文档没有见到？ */
  Miniprogram = 'miniprogram',
  /**
   * 扫码推事件用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），
   * 且会将扫码的结果传给开发者，开发者可以下发消息。
   */
  ScanCodePush = 'scancode_push',
  /**
   * 扫码推事件且弹出“消息接收中”提示框用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后，将扫码的结果传给开发者，
   * 同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息。
   */
  ScanCodeWaitMsg = 'scancode_waitmsg',
  /**
   * 弹出系统拍照发图用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，
   * 同时收起系统相机，随后可能会收到开发者下发的消息。
   */
  PicSysPhoto = 'pic_sysphoto',
  /** 弹出拍照或者相册发图用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程。 */
  PicPhotoOrAlbum = 'pic_photo_or_album',
  /**
   * 弹出微信相册发图器用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，
   * 同时收起相册，随后可能会收到开发者下发的消息。
   */
  PicWeixin = 'pic_weixin',
  /**
   * 弹出地理位置选择器用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，
   * 同时收起位置选择工具，随后可能会收到开发者下发的消息。
   */
  LocationSelect = 'location_select',
  /**
   * 注意：专门给第三方平台旗下未微信认证（具体而言，是资质认证未通过）的订阅号准备的事件类型，它们是没有事件推送的，能力相对受限，其他类型的公众号不必使用
   * 下发消息（除文本消息）用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户，
   * 永久素材类型可以是图片、音频、视频、图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
   */
  MediaId = 'media_id',
  /**
   * 注意：专门给第三方平台旗下未微信认证（具体而言，是资质认证未通过）的订阅号准备的事件类型，它们是没有事件推送的，能力相对受限，其他类型的公众号不必使用
   * 跳转图文消息URL用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL，永久素材类型只支持图文消息。
   * 请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。​
   */
  ViewLimited = 'view_limited'
}

/** 微信公众号回调事件类型 */
export const enum OfficialCallbackEventType {
  /** 模板消息发送完成事件 */
  TemplateSendJobFinish = 'TEMPLATESENDJOBFINISH',
  /** 用户关注公众号 */
  Subscribe = 'subscribe',
  /** 用户取消关注公众号 */
  Unsubscribe = 'unsubscribe',
  /** 用户点击自定义CLICK类型菜单 */
  ClickMenu = 'CLICK',
  /** 用户点击自定义VIEW类型菜单 */
  ViewMenu = 'VIEW',
  /** 用户点击自定义扫码类型菜单 */
  ScanCodePushMenu = 'scancode_push',
  /** 用户点击自定义扫码并等待类型菜单 */
  ScanCodeWaitMsgMenu = 'scancode_waitmsg',
  /** 用户点击自定义系统拍照发图类型菜单 */
  PicSysPhotoMenu = 'pic_sysphoto',
  /** 用户点击自定义弹出拍照或者相册发图类型菜单 */
  PicPhotoOrAlbumMenu = 'pic_photo_or_album',
  /** 用户点击自定义微信相册发图类型菜单 */
  PicWeixinMenu = 'pic_weixin',
  /** 用户点击自定义地理位置选择类型菜单 */
  LocationSelectMenu = 'location_select',
  /** 用户点击自定义跳转小程序类型菜单 */
  ViewMiniprogramMenu = 'view_miniprogram'
}

/** 微信公众号回调消息类型 */
export const enum OfficialCallbackMessageType {
  /** 事件类型消息 */
  Event = 'event',
  /** 文本类型消息 */
  Text = 'text',
  /** 文件类型消息 */
  File = 'file',
  /** 图片类型消息 */
  Image = 'image'
}

/** 公众号网页授权类型 */
export const enum OfficialOAuthType {
  /** 静默授权，只能解析出openID */
  Base = 'snsapi_base',
  /** 能够获取到用户的基本信息 */
  UserInfo = 'snsapi_userinfo'
}

/** 用户关注的渠道来源 */
export const enum OfficialSubscribeScene {
  /** 公众号搜索 */
  ADD_SCENE_SEARCH = 'ADD_SCENE_SEARCH',
  /** 公众号迁移 */
  ADD_SCENE_ACCOUNT_MIGRATION = 'ADD_SCENE_ACCOUNT_MIGRATION',
  /** 名片分享 */
  ADD_SCENE_PROFILE_CARD = 'ADD_SCENE_PROFILE_CARD',
  /** 扫描二维码 */
  ADD_SCENE_QR_CODE = 'ADD_SCENE_QR_CODE',
  /** 图文页内名称点击 */
  ADD_SCENE_PROFILE_LINK = 'ADD_SCENE_PROFILE_LINK',
  /** 图文页右上角菜单 */
  ADD_SCENE_PROFILE_ITEM = 'ADD_SCENE_PROFILE_ITEM',
  /** 支付后关注 */
  ADD_SCENE_PAID = 'ADD_SCENE_PAID',
  /** 微信广告 */
  ADD_SCENE_WECHAT_ADVERTISEMENT = 'ADD_SCENE_WECHAT_ADVERTISEMENT',
  /** 其他 */
  ADD_SCENE_OTHERS = 'ADD_SCENE_OTHERS'
}

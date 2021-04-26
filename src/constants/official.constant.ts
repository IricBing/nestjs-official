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
 * 获取公众号自定义菜单接口
 * @see https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Querying_Custom_Menus.html
 * @example https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}
 */
export const OFFICIAL_GET_MENU_URL = 'https://api.weixin.qq.com/cgi-bin/menu/get';

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

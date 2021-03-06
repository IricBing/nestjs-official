/**
 * 发送公众号模板消息附加参数
 * @see https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html#5
 */
export interface SendTemplateMessageOptions {
  /** 跳转URL */
  url?: string;
  /** 跳转小程序信息 */
  miniprogram?: {
    /** 小程序appid */
    appid: string;
    /** 小程序页面路径，可加参数 */
    pagepath: string;
  };
}

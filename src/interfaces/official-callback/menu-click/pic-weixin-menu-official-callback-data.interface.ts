import { OfficialCallbackBaseData } from '../official-callback-base-data.interface';

/** 用户点击微信相册发图类型公众号菜单回调内容 */
export interface PicWeixinMenuOfficialCallbackData extends OfficialCallbackBaseData {
  /** 事件KEY值，与自定义菜单接口中KEY值对应 */
  EventKey: string;
  /** 发送的图片信息 */
  SendPicsInfo: {
    /** 发送的图片数量 */
    Count: number;
    /** 图片列表 */
    PicList: {
      /** 图片的MD5值，开发者若需要，可用于验证接收到图片 */
      PicMd5Sum: string;
    }[];
  };
}

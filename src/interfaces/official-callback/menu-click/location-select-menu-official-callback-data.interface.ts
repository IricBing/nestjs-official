import { OfficialCallbackBaseData } from '../official-callback-base-data.interface';

/** 用户点击地理位置选择类型公众号菜单回调内容 */
export interface LocationSelectMenuOfficialCallbackData extends OfficialCallbackBaseData {
  /** 事件KEY值，与自定义菜单接口中KEY值对应 */
  EventKey: string;
  /** 发送的位置信息 */
  SendLocationInfo: {
    /** X坐标信息 */
    Location_X: number;
    /** Y坐标信息 */
    Location_Y: number;
    /** 精度，可理解为精度或者比例尺、越精细的话 scale越高 */
    Scale: number;
    /** 地理位置的字符串信息 */
    Label: string;
    /** 朋友圈POI的名字，可能为空 */
    Poiname: string;
  };
}

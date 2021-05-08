import { OfficialCallbackBaseData } from '../official-callback-base-data.interface';

/** 用户点击扫码并等待类型公众号菜单回调内容 */
export interface ScanCodeWaitMsgMenuOfficialCallbackData extends OfficialCallbackBaseData {
  /** 事件KEY值，与自定义菜单接口中KEY值对应 */
  EventKey: string;

  /** 扫描信息 */
  ScanCodeInfo: {
    /** 扫描类型，一般是qrcode */
    ScanType: string;

    /** 扫描结果，即二维码对应的字符串信息 */
    ScanResult: string;
  };
}

import { OfficialResponseCode } from '../constants/official.constant';

/** 生成返回给微信服务器应答信息方法传参 */
export interface GenerateOfficialResponseParams {
  /** 状态码 */
  return_code: OfficialResponseCode;
  /** 返回信息 */
  return_msg?: string;
}

import { BaseResponse } from '../base.response.interface';

interface GetJSSDKConfigResponseData {
  /** 时间戳，注意为10位，即单位为秒 */
  timestamp: number;

  /** 随机字符串 */
  nonceStr: string;

  /** 签名 */
  signature: string;
}

/** 获取公众号网页配置JSSDK Config返回类型 */
export interface GetJSSDKConfigResponse extends BaseResponse<GetJSSDKConfigResponseData> {}

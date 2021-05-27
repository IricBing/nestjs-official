import { OfficialLanguageType } from '../../../constants/common.constant';

/** 批量获取用户信息请求参数 */
export interface BatchGetUserInfoParams {
  /** 公众号OpenId */
  openId: string;

  /** 返回国家地区语言版本，默认简体中文 */
  lang?: OfficialLanguageType;
}

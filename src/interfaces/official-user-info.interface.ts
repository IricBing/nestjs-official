import { OfficialLanguageType } from '../constants/common.constant';
import { OfficialSubscribeScene } from '../constants/official.constant';

/** 公众号用户信息 */
export interface OfficialUserInfo {
  /** 用户是否订阅该公众号标识，值为0时，代表此用户没有关注该公众号，拉取不到其余信息。 */
  subscribe: 0 | 1;
  /** 用户的标识，对当前公众号唯一 */
  openid: string;
  /**
   * 用户在开放平台上的唯一标识
   * @description 只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
   */
  unionid?: string;
  /** 用户的昵称 */
  nickname: string;
  /**
   * 用户性别
   * @description `0`-未知
   * @description `1`-男性
   * @description `2`-女性
   */
  sex: 0 | 1 | 2;
  /** 用户所在城市 */
  city: string;
  /** 用户所在国家 */
  country: string;
  /** 用户所在省份 */
  province: string;
  /** 用户的语言 */
  language: OfficialLanguageType;
  /**
   * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像）
   * @description 用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
   */
  headimgurl?: string;
  /**
   * 用户关注时间，为时间戳
   * @description 如果用户曾多次关注，则取最后关注时间
   * @example 1382694957
   */
  subscribe_time: number;
  /** 公众号运营者对粉丝的备注，公众号运营者可在微信公众平台用户管理界面对粉丝添加备注 */
  remark: string;
  /** 用户所在的分组ID（兼容旧的用户分组接口） */
  groupid: number;
  /**
   * 用户被打上的标签ID列表
   * @example [128,2]
   */
  tagid_list: number[];
  /** 用户关注的渠道来源 */
  subscribe_scene: OfficialSubscribeScene;
  /**
   * 二维码扫码场景（开发者自定义）
   * @example 98765
   */
  qr_scene: number;
  /** 二维码扫码场景描述（开发者自定义） */
  qr_scene_str: string;
}

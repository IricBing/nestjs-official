import { OfficialBaseResponse } from '../base.official.response.interface';

/** 获取关注着openid列表返回类型 */
export interface OfficialGetSubscriberOpenidListResponse extends OfficialBaseResponse {
  /** 关注该公众账号的总用户数 */
  total: number;

  /** 拉取的OPENID个数，最大值为10000 */
  count: number;

  /** 列表数据，OPENID的列表 */
  data: {
    /** OPENID列表 */
    openid: string[];
  };

  /** 拉取列表的最后一个用户的OPENID */
  next_openid?: string;
}

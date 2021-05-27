import { BaseResponse } from '../base.response.interface';

interface GetSubscriberOpenidListResponseData {
  /** 关注该公众账号的总用户数 */
  total: number;

  /** 拉取的OPENID个数，最大值为10000 */
  count: number;

  /** OPENID列表 */
  openidList: string[];

  /** 拉取列表的最后一个用户的OPENID */
  nextOpenid?: string;
}

/** 获取关注者openid列表返回结果 */
export interface GetSubscriberOpenidListResponse extends BaseResponse<GetSubscriberOpenidListResponseData> {}

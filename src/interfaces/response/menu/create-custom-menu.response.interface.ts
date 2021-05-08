import { BaseResponse } from '../base.response.interface';

/** 创建个性化菜单返回数据 */
interface CreateCustomMenuResponseData {
  /** 个性化菜单ID */
  menuid: string;
}

/** 创建公众号个性化菜单信息返回结果 */
export interface CreateCustomMenuResponse extends BaseResponse<CreateCustomMenuResponseData> {}

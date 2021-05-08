import { OfficialBaseResponse } from '../base.official.response.interface';

/** 创建公众号个性化菜单信息返回类型 */
export interface OfficialCreateCustomMenuResponse extends OfficialBaseResponse {
  /** 个性化菜单ID */
  menuid: string;
}

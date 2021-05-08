import { OfficialCustomMenu } from '../../official-custom-menu.interface';
import { BaseResponse } from '../base.response.interface';

/** 查询公众号菜单信息返回结果 */
export interface QueryMenuResponse extends BaseResponse<OfficialCustomMenu> {}

import { OfficialCustomMenu } from '../../../official-custom-menu.interface';
import { OfficialBaseResponse } from '../base.official.response.interface';

/** 获取公众号菜单信息返回类型 */
export interface OfficialQueryMenuResponse extends OfficialBaseResponse {
  /** 菜单信息 */
  menu: OfficialCustomMenu;
}

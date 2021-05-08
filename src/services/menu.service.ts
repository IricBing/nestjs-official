import { HttpService, Injectable } from '@nestjs/common';
import { OFFICIAL_CREATE_MENU_URL, OFFICIAL_GET_MENU_URL } from '../constants/official.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialError } from '../errors/official.error';
import { OfficialMenu } from '../interfaces/official-menu.interface';
import { CreateMenuResponse } from '../interfaces/response/menu/create-menu.response.interface';
import { DeleteMenuResponse } from '../interfaces/response/menu/delete-menu.response.interface';
import { QueryMenuResponse } from '../interfaces/response/menu/query-menu.response.interface';
import { OfficialBaseResponse } from '../interfaces/response/official/base.official.response.interface';
import { OfficialQueryMenuResponse } from '../interfaces/response/official/menu/query-menu.official.response.interface';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class OfficialMenuService {
  constructor(private readonly httpService: HttpService, private readonly officialUtil: OfficialUtil) {}

  /**
   * 创建/更新公众号菜单
   * @param data 公众号菜单信息
   * @returns 创建/更新结果
   */
  @OfficialErrorWrapper()
  async create(data: OfficialMenu): Promise<CreateMenuResponse> {
    const { data: res } = await this.httpService
      .post<OfficialBaseResponse>(OFFICIAL_CREATE_MENU_URL, data, {
        params: { access_token: await this.officialUtil.getAccessToken() }
      })
      .toPromise();

    if (res.errcode) throw new OfficialError(res.errmsg?.toString());

    return { success: true, data: true };
  }

  /**
   * 删除公众号菜单
   * @returns 删除结果
   */
  @OfficialErrorWrapper()
  async delete(): Promise<DeleteMenuResponse> {
    const { data } = await this.httpService
      .get<OfficialBaseResponse>(OFFICIAL_CREATE_MENU_URL, {
        params: { access_token: await this.officialUtil.getAccessToken() }
      })
      .toPromise();

    if (data.errcode) throw new OfficialError(data.errmsg?.toString());

    return { success: true, data: true };
  }

  /**
   * 查询公众号菜单信息
   * @returns 查询结果
   */
  @OfficialErrorWrapper()
  async query(): Promise<QueryMenuResponse> {
    const { data } = await this.httpService
      .get<OfficialQueryMenuResponse>(OFFICIAL_GET_MENU_URL, {
        params: { access_token: await this.officialUtil.getAccessToken() }
      })
      .toPromise();

    if (data.errcode) throw new OfficialError(data.errmsg?.toString());

    return { success: true, data: data.menu };
  }
}

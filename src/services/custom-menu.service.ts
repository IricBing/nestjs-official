import { HttpService, Injectable } from '@nestjs/common';
import { OFFICIAL_CREATE_CUSTOM_MENU_URL } from '../constants/official.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialError } from '../errors/official.error';
import { OfficialCustomMenu } from '../interfaces/official-custom-menu.interface';
import { CreateCustomMenuResponse } from '../interfaces/response/menu/create-custom-menu.response.interface';
import { OfficialCreateCustomMenuResponse } from '../interfaces/response/official/menu/create-custom-menu.official.response.interface';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class OfficialCustomMenuService {
  constructor(private readonly httpService: HttpService, private readonly officialUtil: OfficialUtil) {}

  /**
   * 创建公众号个性化菜单
   * @param data 公众号个性化菜单信息
   * @returns 创建结果
   */
  @OfficialErrorWrapper()
  async create(data: OfficialCustomMenu): Promise<CreateCustomMenuResponse> {
    const { data: res } = await this.httpService
      .post<OfficialCreateCustomMenuResponse>(OFFICIAL_CREATE_CUSTOM_MENU_URL, data, {
        params: { access_token: await this.officialUtil.getAccessToken() }
      })
      .toPromise();

    if (res.errcode) throw new OfficialError(res.errmsg?.toString());

    return { success: true, data: { menuid: res.menuid } };
  }
}

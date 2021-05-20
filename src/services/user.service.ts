import { HttpService, Injectable } from '@nestjs/common';
import * as JsonBig from 'json-bigint';
import { OfficialLanguageType } from '../constants/common.constant';
import { OFFICIAL_GET_USER_INFO_BY_OPEN_ID_URL } from '../constants/official.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialError } from '../errors/official.error';
import { OfficialUserInfo } from '../interfaces/official-user-info.interface';
import { OfficialGetUserInfoResponse } from '../interfaces/response/official/user/get-user-info.official.response.interface';
import { GetUserInfoResponse } from '../interfaces/response/user/get-user-info.response.interface';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class OfficialUserService {
  constructor(private readonly httpService: HttpService, private readonly officialUtil: OfficialUtil) {}

  /**
   * 获取用户基本信息（UnionID机制）
   * @param openId 公众号OpenId
   * @param lang 返回国家地区语言版本，默认简体中文
   * @returns 公众号用户信息
   */
  @OfficialErrorWrapper()
  async getInfo(openId: string, lang = OfficialLanguageType.ZH_CN): Promise<GetUserInfoResponse> {
    const { data } = await this.httpService
      .get<OfficialGetUserInfoResponse>(OFFICIAL_GET_USER_INFO_BY_OPEN_ID_URL, {
        params: {
          access_token: await this.officialUtil.getAccessToken(),
          openid: openId,
          lang
        },
        transformResponse: [res => JsonBig.parse(res)]
      })
      .toPromise();

    if (data.errcode) throw new OfficialError(data.errmsg?.toString());
    if (!data.subscribe) throw new OfficialError('用户为关注公众号');

    const userInfo: OfficialUserInfo = {
      subscribe: data.subscribe,
      openid: data.openid,
      nickname: data.nickname,
      sex: data.sex,
      city: data.city,
      country: data.country,
      province: data.province,
      language: data.language,
      headimgurl: data.headimgurl,
      subscribe_time: data.subscribe_time,
      remark: data.remark,
      groupid: data.groupid,
      tagid_list: data.tagid_list,
      subscribe_scene: data.subscribe_scene,
      qr_scene: data.qr_scene,
      qr_scene_str: data.qr_scene_str
    };
    if (data.unionid) Object.assign(userInfo, { unionid: data.unionid });

    return { success: true, data: userInfo };
  }
}

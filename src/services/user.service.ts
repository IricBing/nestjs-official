import { HttpService, Injectable } from '@nestjs/common';
import * as JsonBig from 'json-bigint';
import { OfficialLanguageType } from '../constants/common.constant';
import { OFFICIAL_BATCH_GET_USER_INFO_BY_OPEN_ID_URL, OFFICIAL_GET_USER_INFO_BY_OPEN_ID_URL, OFFICIAL_GET_USER_OPENID_LIST_URL } from '../constants/official.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialError } from '../errors/official.error';
import { OfficialUserInfo } from '../interfaces/official-user-info.interface';
import { BatchGetUserInfoParams } from '../interfaces/params/user/batch-get-user-info.params.interface';
import { OfficialBatchGetUserInfoResponse } from '../interfaces/response/official/user/batch-get-user-info.official.response.interface';
import { OfficialGetSubscriberOpenidListResponse } from '../interfaces/response/official/user/get-subscriber-openid-list.official.response.interface';
import { OfficialGetUserInfoResponse } from '../interfaces/response/official/user/get-user-info.official.response.interface';
import { BatchGetUserInfoResponse } from '../interfaces/response/user/batch-get-user-info.response.interface';
import { GetSubscriberOpenidListResponse } from '../interfaces/response/user/get-subscriber-openid-list.response.interface';
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
    if (!data.subscribe) throw new OfficialError('用户未关注公众号');

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

  /**
   * 批量获取用户基本信息（UnionID机制）
   * @param params 用户openId和语言列表
   * @returns 用户信息列表
   */
  @OfficialErrorWrapper()
  async batchGetInfo(params: BatchGetUserInfoParams[]): Promise<BatchGetUserInfoResponse> {
    const { data } = await this.httpService
      .post<OfficialBatchGetUserInfoResponse>(
        OFFICIAL_BATCH_GET_USER_INFO_BY_OPEN_ID_URL,
        { user_list: params },
        {
          params: { access_token: await this.officialUtil.getAccessToken() },
          transformResponse: [res => JsonBig.parse(res)]
        }
      )
      .toPromise();

    if (data.errcode) throw new OfficialError(data.errmsg?.toString());

    const { user_info_list: userInfoList } = data;

    const userList = userInfoList?.map(userInfo => {
      const user: OfficialUserInfo = {
        subscribe: userInfo.subscribe,
        openid: userInfo.openid,
        nickname: userInfo.nickname,
        sex: userInfo.sex,
        city: userInfo.city,
        country: userInfo.country,
        province: userInfo.province,
        language: userInfo.language,
        headimgurl: userInfo.headimgurl,
        subscribe_time: userInfo.subscribe_time,
        remark: userInfo.remark,
        groupid: userInfo.groupid,
        tagid_list: userInfo.tagid_list,
        subscribe_scene: userInfo.subscribe_scene,
        qr_scene: userInfo.qr_scene,
        qr_scene_str: userInfo.qr_scene_str
      };
      if (userInfo.unionid) Object.assign(user, { unionid: userInfo.unionid });
      return user;
    });

    return { success: true, data: userList };
  }

  /**
   * 获取关注公众号的openid列表
   * @param nextOpenid 下一次拉取的起始值
   * @returns 关注者的openid列表信息
   */
  @OfficialErrorWrapper()
  async getSubscriberOpenidList(nextOpenid?: string): Promise<GetSubscriberOpenidListResponse> {
    const { data } = await this.httpService
      .get<OfficialGetSubscriberOpenidListResponse>(OFFICIAL_GET_USER_OPENID_LIST_URL, {
        params: { access_token: await this.officialUtil.getAccessToken(), next_openid: nextOpenid },
        transformResponse: [res => JsonBig.parse(res)]
      })
      .toPromise();

    if (data.errcode) throw new OfficialError(data.errmsg?.toString());

    return {
      success: true,
      data: {
        total: data.total,
        count: data.count,
        openidList: data.data.openid,
        nextOpenid: data.next_openid
      }
    };
  }
}

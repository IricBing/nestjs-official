import { OfficialUserInfo } from '../../official-user-info.interface';
import { BaseResponse } from '../base.response.interface';

/** 获取用户信息（UnionID机制）返回结果 */
export interface GetUserInfoResponse extends BaseResponse<OfficialUserInfo> {}

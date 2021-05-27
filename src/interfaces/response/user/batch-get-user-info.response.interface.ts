import { OfficialUserInfo } from '../../official-user-info.interface';
import { BaseResponse } from '../base.response.interface';

/** 批量获取用户信息（UnionID机制）返回结果 */
export interface BatchGetUserInfoResponse extends BaseResponse<OfficialUserInfo[]> {}

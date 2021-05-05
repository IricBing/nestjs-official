import { Injectable } from '@nestjs/common';
import { FunctionType } from '../constants/common.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { MessageValidateResponse } from '../interfaces/response/auth/message-validate.response.interface';
import { ServerValidateResponse } from '../interfaces/response/auth/server-validate.response.interface';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class OfficialAuthService {
  constructor(private readonly officialUtil: OfficialUtil) {}

  /**
   * 微信调用第三方服务器签名认证
   * @param timestamp 时间戳
   * @param nonce 随机字符串
   * @param signature 签名信息
   * @returns 签名校验结果
   */
  @OfficialErrorWrapper({ type: FunctionType.Sync })
  serverValidate(timestamp: string, nonce: string, signature: string): ServerValidateResponse {
    const result = this.officialUtil.checkSignature(timestamp, nonce, signature);

    return { success: true, data: result };
  }

  /**
   * 微信转发信息签名校验
   * @param timestamp 时间戳
   * @param nonce 随机字符串
   * @param encryptMessage 加密信息
   * @param signature 签名信息
   * @returns 签名校验结果
   */
  @OfficialErrorWrapper({ type: FunctionType.Sync })
  messageValidate(timestamp: string, nonce: string, encryptMessage: string, signature: string): MessageValidateResponse {
    const result = this.officialUtil.checkSignature(timestamp, nonce, signature, encryptMessage);

    return { success: true, data: result };
  }
}

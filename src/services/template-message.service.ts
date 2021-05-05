import { HttpService, Injectable } from '@nestjs/common';
import * as JsonBig from 'json-bigint';
import { OFFICIAL_SEND_TEMPLATE_MESSAGE_URL } from '../constants/official.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialError } from '../errors/official.error';
import { OfficialSendTemplateMessageResponse } from '../interfaces/response/official/send-template-message.official.response.interface';
import { SendTemplateMessageResponse } from '../interfaces/response/template-message/send-template-message.response.interface';
import { SendTemplateMessageOptions } from '../interfaces/send-template-message-options.interface';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class OfficialTemplateMessageService {
  constructor(private readonly httpService: HttpService, private readonly officialUtil: OfficialUtil) {}

  /**
   * 发送模板消息
   * @param openId 接收人openid
   * @param templateId 模板消息ID
   * @param data 消息内容
   * @param options 附加参数
   * @returns 模板消息发送结果
   */
  @OfficialErrorWrapper()
  async sendTemplateMessage(openId: string, templateId: string, data: {}, options?: SendTemplateMessageOptions): Promise<SendTemplateMessageResponse> {
    const bodyData = {
      touser: openId,
      template_id: templateId,
      data,
      ...options
    };

    const { data: res } = await this.httpService
      .post<OfficialSendTemplateMessageResponse>(OFFICIAL_SEND_TEMPLATE_MESSAGE_URL, bodyData, {
        params: { access_token: await this.officialUtil.getAccessToken() },
        transformResponse: [res => JsonBig.parse(res)]
      })
      .toPromise();

    if (res.errcode) throw new OfficialError(res.errmsg?.toString());

    return { success: true, data: { messageId: res.msgid, message: JSON.stringify(bodyData) } };
  }
}

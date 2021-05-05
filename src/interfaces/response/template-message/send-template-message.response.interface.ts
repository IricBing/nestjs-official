import { BaseResponse } from '../base.response.interface';

interface SendTemplateMessageResponseData {
  /** 模板消息记录ID */
  messageId: number;
  /** 消息内容 */
  message: string;
}

/** 发送模板消息返回结果 */
export interface SendTemplateMessageResponse extends BaseResponse<SendTemplateMessageResponseData> {}

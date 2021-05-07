import { OfficialCallbackBaseData } from './official-callback-base-data.interface';

/** 用户向公众号发送文件内容 */
export interface FileReceiveOfficialCallbackData extends OfficialCallbackBaseData {
  /** 文件名称 */
  Title: string;

  /** 文件描述 */
  Description: string;

  /** 文件Key？？？？ */
  FileKey: string;

  /** md5校验值 */
  FileMd5: string;

  /** 文件大小？？ */
  FileTotalLen: string;

  /** 消息ID */
  MsgId: string;
}

import { Inject, Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { BufferEncodingType, EncryptType, FunctionType, OPTIONS_PROVIDER } from '../constants/common.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { GenerateOfficialResponseParams } from '../interfaces/generate-official-response.params.interface';
import { OfficialModuleOptions } from '../interfaces/options.interface';
import { DecryptMessageResponse } from '../interfaces/response/message/decrypt-message.response.interface';
import { EncryptMessageResponse } from '../interfaces/response/message/encrypt-message.response.interface';
import { GenerateResponseMessageResponse } from '../interfaces/response/message/generate-response-message.response.interface';
import { XML } from '../types/xml.type';
import { EncoderUtil } from '../utils/encoder.util';
import { OfficialUtil } from '../utils/official.util';
import { XmlUtil } from '../utils/xml.util';

@Injectable()
export class OfficialMessageService {
  constructor(
    @Inject(OPTIONS_PROVIDER)
    private readonly options: OfficialModuleOptions,
    private readonly officialUtil: OfficialUtil,
    private readonly encoderUtil: EncoderUtil,
    private readonly xmlUtil: XmlUtil
  ) {}

  /**
   * 生成返回给微信服务器应答信息
   * @param params 返回参数
   * @returns 生成结果
   */
  @OfficialErrorWrapper({ type: FunctionType.Sync })
  generateResponseMessage(params: GenerateOfficialResponseParams): GenerateResponseMessageResponse {
    return { success: true, data: this.xmlUtil.object2xml(params) };
  }

  /**
   * 解密微信回调信息
   * @param encryptMessage 加密信息
   * @returns 解密结果
   */
  @OfficialErrorWrapper({ type: FunctionType.Sync })
  decrypt<T>(encryptMessage: string): DecryptMessageResponse<T> {
    const encodingAESKeyBuffer = Buffer.from(this.options.encodingAESKey + '=', BufferEncodingType.BASE64);
    //实例 AES 解密对象
    const deCipheriv = createDecipheriv(EncryptType.ASE256CBC, encodingAESKeyBuffer, encodingAESKeyBuffer.slice(0, 16));
    //设置自定填充数据为 false
    deCipheriv.setAutoPadding(false);
    //对密文解密对密文解密 并去除前 16 个随机字符串
    const deEncryptedMsg = Buffer.concat([deCipheriv.update(encryptMessage, BufferEncodingType.BASE64), deCipheriv.final()]).toString('utf8');
    //获取填充字符串的位置
    const pad = deEncryptedMsg.charCodeAt(deEncryptedMsg.length - 1);

    return { success: true, data: this.xml2object(deEncryptedMsg.slice(20, -pad).replace(/<\/xml>.*/, '</xml>')) };
  }

  /**
   * 加密信息
   * @param timestamp 时间戳
   * @param nonce 随机字符串
   * @param xml xml信息
   * @returns 加密后的结果
   */
  @OfficialErrorWrapper({ type: FunctionType.Sync })
  encrypt(timestamp: string, nonce: string, xml: XML): EncryptMessageResponse {
    //声明 16位的随机字符串
    const random = randomBytes(8).toString('hex');
    const text = Buffer.from(xml);
    const buf = Buffer.alloc(4);
    buf.writeUInt32BE(text.length, 0);
    //进行PKCS7补位
    const pack = this.encoderUtil.PKCS7(20 + text.length + this.options.appId.length);
    //拼接要加密的字符串
    const content = random + buf.toString(BufferEncodingType.BINARY) + text.toString(BufferEncodingType.BINARY) + this.options.appId + pack;
    //实例 AES 加密对象
    const encodingAESKeyBuffer = Buffer.from(this.options.encodingAESKey + '=', BufferEncodingType.BASE64);
    const cipheriv = createCipheriv(EncryptType.ASE256CBC, encodingAESKeyBuffer, encodingAESKeyBuffer.slice(0, 16));
    //设置自定填充数据为 false
    cipheriv.setAutoPadding(false);
    //对明文加密
    const encryptedMessage = Buffer.concat([cipheriv.update(content, BufferEncodingType.BINARY), cipheriv.final()]).toString(BufferEncodingType.BASE64);
    //获取认证签名
    const msgSignature = this.officialUtil.messageSignature(timestamp, nonce, encryptedMessage);

    return {
      success: true,
      data: this.xmlUtil.object2xml({
        Encrypt: encryptedMessage,
        MsgSignature: msgSignature,
        TimeStamp: timestamp,
        Nonce: nonce
      })
    };
  }

  /**
   * 将xml转换为object
   * @param xml xml信息
   * @returns 转换后的object
   */
  private xml2object<T>(xml: XML): T {
    if (!xml || typeof xml !== 'string') return {} as T;
    const result = {};
    const ms = xml.replace(/^<xml>|<\/xml>$/g, '').match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/gi);
    if (ms && ms.length > 0)
      ms.forEach(t => {
        const ms = t.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i);
        const tagName = ms[1];
        let cdata = ms[2] || '';
        cdata = cdata.replace(/^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g, '');
        result[tagName] = cdata;
      });

    return result as T;
  }
}

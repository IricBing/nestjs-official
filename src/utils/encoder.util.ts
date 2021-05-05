import { Injectable } from '@nestjs/common';

@Injectable()
export class EncoderUtil {
  /**
   * PKCS7补位 算法
   * @param textLength 字符串长度
   * @returns 补位算法结果
   */
  PKCS7(textLength: number): string {
    const block_size = 32;
    // 计算需要填充的位数
    let amount_to_pad = block_size - (textLength % block_size);
    if (amount_to_pad === 0) amount_to_pad = block_size;
    // 获得补位所用的字符
    const pad = String.fromCharCode(amount_to_pad);
    const s = [];
    for (let i = 0; i < amount_to_pad; i++) s.push(pad);
    return s.join('');
  }
}

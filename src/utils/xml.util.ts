import { Inject, Injectable } from '@nestjs/common';
import { Builder, parseString } from 'xml2js';
import { XML_BUILDER_PROVIDER } from '../constants/common.constant';
import { XML } from '../types/xml.type';

@Injectable()
export class XmlUtil {
  constructor(
    @Inject(XML_BUILDER_PROVIDER)
    private readonly xmlBuilder: Builder
  ) {}

  /**
   * 对象转为xml
   * @param obj 要转换的对象
   * @returns 转换后的xml结果
   */
  object2xml(obj: {}): XML {
    return this.xmlBuilder.buildObject(obj);
  }

  /**
   * 将xml文本转换为对象
   * @param xml xml文本
   * @returns 转换后的对象
   */
  xml2object<T>(xml: XML): Promise<T> {
    return new Promise<T>((resolve, reject) => parseString(xml, { explicitRoot: false, explicitArray: false }, (error, result) => (error ? reject(error) : resolve(result))));
  }
}

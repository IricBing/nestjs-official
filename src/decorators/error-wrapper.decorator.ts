import { FunctionType } from '../constants/common.constant';
import { OfficialError } from '../errors/official.error';
import { ErrorWrapperParams } from '../interfaces/error-wrapper-params.interface';

/**
 * 错误捕获装饰器
 * @param params 错误捕获参数
 * @returns 包装好的错误格式或正常的方法调用
 */
export const OfficialErrorWrapper = (params?: ErrorWrapperParams) => (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value;
  const type = params?.type || FunctionType.Async; // 默认方法为异步方法
  switch (type) {
    case FunctionType.Async:
      descriptor.value = async function () {
        try {
          return await original.apply(this, arguments);
        } catch (error) {
          if (error instanceof OfficialError) {
            return { success: false, error: error.message };
          }
          throw error;
        }
      };
      break;
    case FunctionType.Sync:
      descriptor.value = function () {
        try {
          return original.apply(this, arguments);
        } catch (error) {
          if (error instanceof OfficialError) {
            return { success: false, error: error.message };
          }
          throw error;
        }
      };
      break;
    default:
      throw new Error('Invalid Function Type');
  }
};

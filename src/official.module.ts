import { DynamicModule, Module } from '@nestjs/common';
import { OfficialModuleAsyncOptions, OfficialModuleOptions } from './interfaces/options.interface';
import { OfficialCoreModule } from './official-core.module';

@Module({})
export class OfficialModule {
  /**
   * 同步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRoot(options: OfficialModuleOptions): DynamicModule {
    return {
      module: OfficialModule,
      imports: [OfficialCoreModule.forRoot(options)]
    };
  }

  /**
   * 异步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRootAsync(options: OfficialModuleAsyncOptions): DynamicModule {
    return {
      module: OfficialModule,
      imports: [OfficialCoreModule.forRootAsync(options)]
    };
  }
}

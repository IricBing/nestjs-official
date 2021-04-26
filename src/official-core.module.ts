import { DynamicModule, Global, HttpModule, Module, OnModuleDestroy, Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Redis } from 'ioredis';
import { ACCESS_TOKEN_CONFIG_PROVIDER, JSSDK_TICKET_PROVIDER, OPTIONS_PROVIDER, REDIS_CLIENT_PROVIDER } from './constants/common.constant';
import { OfficialModuleAsyncOptions, OfficialModuleOptions, OfficialOptionsFactory } from './interfaces/options.interface';
import { createRedisClientProvider } from './providers/redis-client.provider';
import { IricUtil } from './utils/iric.util';
import { OfficialUtil } from './utils/official.util';
import { TicketUtil } from './utils/ticket.util';

@Global()
@Module({})
export class OfficialCoreModule implements OnModuleDestroy {
  constructor(private readonly moduleRef: ModuleRef) {}

  /**
   * 同步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRoot(options: OfficialModuleOptions): DynamicModule {
    return {
      module: OfficialCoreModule,
      imports: [HttpModule],
      providers: [
        OfficialUtil,
        TicketUtil,
        IricUtil,
        createRedisClientProvider(),
        { provide: OPTIONS_PROVIDER, useValue: options },
        { provide: ACCESS_TOKEN_CONFIG_PROVIDER, useValue: { token: '', expiresAt: null } },
        { provide: JSSDK_TICKET_PROVIDER, useValue: { ticket: '', expiresAt: null } }
      ],
      exports: []
    };
  }

  /**
   * 异步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRootAsync(options: OfficialModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: OfficialCoreModule,
      imports: [...(options.imports || []), HttpModule],
      providers: [
        ...asyncProviders,
        OfficialUtil,
        TicketUtil,
        IricUtil,
        createRedisClientProvider(),
        { provide: ACCESS_TOKEN_CONFIG_PROVIDER, useValue: { token: '', expiresAt: null } },
        { provide: JSSDK_TICKET_PROVIDER, useValue: { ticket: '', expiresAt: null } }
      ],
      exports: []
    };
  }

  /**
   * 创建异步Provider列表
   * @param options 异步配置
   * @returns Provider列表
   */
  private static createAsyncProviders(options: OfficialModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass
      }
    ];
  }

  /**
   * 创建异步Provider
   * @param options 异步配置
   * @returns Provider
   */
  private static createAsyncOptionsProvider(options: OfficialModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: OPTIONS_PROVIDER,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    const inject = [options.useClass || options.useExisting];
    return {
      provide: OPTIONS_PROVIDER,
      useFactory: async (optionsFactory: OfficialOptionsFactory) => await optionsFactory.createOfficialOptions(),
      inject
    };
  }

  onModuleDestroy() {
    const redisClient = this.moduleRef.get<Redis>(REDIS_CLIENT_PROVIDER);
    if (redisClient) redisClient.disconnect();
  }
}

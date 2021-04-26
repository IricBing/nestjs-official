import { Provider } from '@nestjs/common';
import { OPTIONS_PROVIDER, REDIS_CLIENT_PROVIDER } from '../constants/common.constant';
import { OfficialModuleOptions } from '../interfaces/options.interface';
import * as Redis from 'ioredis';

export const createRedisClientProvider = (): Provider => ({
  provide: REDIS_CLIENT_PROVIDER,
  useFactory: async ({ redisOptions }: OfficialModuleOptions): Promise<Redis.Redis> => (redisOptions ? new Redis(redisOptions) : null),
  inject: [OPTIONS_PROVIDER]
});

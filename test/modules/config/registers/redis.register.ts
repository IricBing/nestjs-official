import { registerAs } from '@nestjs/config';

export const RedisConfigRegister = registerAs('redis', () => ({
  official: {
    name: process.env.REDIS_OFFICIAL_NAME,
    db: process.env.REDIS_OFFICIAL_DB,
    host: process.env.REDIS_OFFICIAL_HOST,
    port: parseInt(process.env.REDIS_OFFICIAL_PORT),
    password: process.env.REDIS_OFFICIAL_PASSWORD,
    keyPrefix: process.env.REDIS_OFFICIAL_KEY_PREFIX
  }
}));

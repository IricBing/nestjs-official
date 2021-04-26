import * as Joi from 'joi';

/** .env文件校验 */
export const ConfigValidation = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging').default('development'),

  // 微信公众号相关配置
  OFFICIAL_APP_ID: Joi.string().required(),
  OFFICIAL_APP_SECRET: Joi.string().required(),
  OFFICIAL_AUTH_TOKEN: Joi.string().required(),
  OFFICIAL_ENCODING_AES_KEY: Joi.string().required(),

  // Redis OFFICIAL数据库配置
  REDIS_OFFICIAL_NAME: Joi.string().default('mp'),
  REDIS_OFFICIAL_DB: Joi.number().default(1),
  REDIS_OFFICIAL_HOST: Joi.string().default('127.0.0.1'),
  REDIS_OFFICIAL_PORT: Joi.number().default(6379),
  REDIS_OFFICIAL_PASSWORD: Joi.string().allow('').default(''),
  REDIS_OFFICIAL_KEY_PREFIX: Joi.string().default('mp-')
});

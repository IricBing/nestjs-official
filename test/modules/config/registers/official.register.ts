import { registerAs } from '@nestjs/config';

export const OfficialRegister = registerAs('official', () => ({
  appId: process.env.OFFICIAL_APP_ID,
  appSecret: process.env.OFFICIAL_APP_SECRET,
  authToken: process.env.OFFICIAL_AUTH_TOKEN,
  encodingAESKey: process.env.OFFICIAL_ENCODING_AES_KEY
}));

import { Module } from '@nestjs/common';
import { OfficialModule } from '../src/official.module';
import { ConfigModule } from './modules/config/config.module';
import { CONFIG_PROVIDER } from './modules/config/constants/config.constant';
import { ConfigService } from './modules/config/services/config.service';

@Module({
  imports: [
    // OfficialModule.forRoot({
    //   appId: '你的appId',
    //   appSecret: '你的appSecret',
    //   authToken: '你的Token',
    //   encodingAESKey: '你的加密密钥',
    //   redisOptions: '你的redis配置'
    // }),
    OfficialModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        appId: configService.official.appId,
        appSecret: configService.official.appSecret,
        authToken: configService.official.authToken,
        encodingAESKey: configService.official.encodingAESKey,
        redisOptions: configService.redis.official
      }),
      inject: [CONFIG_PROVIDER]
    }),
    ConfigModule
  ]
})
export class AppModule {}

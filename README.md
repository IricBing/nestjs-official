# NestJS 微信公众号插件

注意：<font color="#dd0000">仍在开发中，目前仅在内部使用</font><br /> 

## 使用说明

外部人员仅供参考，请不要用于生产环境，因此导致的事故后果请自行承担。

### 支持环境

* node >=`14.x`

### 安装

``` shell
$ npm i @lantsang/nestjs-official

or
$ yarn add @lantsang/nestjs-official  # 推荐使用yarn
```

### 配置

#### 同步方式

``` typescript
import { Module } from '@nestjs/common';
import { OfficialModule } from '@lantsang/nestjs-official'

@Module({
  imports: [
    OfficialModule.forRoot({
      appId: '公众号appid', 
      appSecret: '公众号app secret',
      authToken: '微信调用第三方服务器token', // 当启用服务器配置时必填
      encodingAESKey: '微信调用第三方服务器消息加密解密秘钥', // 当启用服务器配置时必填
      redisOptions: {   // redisOptions 参数选填
        host:'localhost',
        port:6379,
        db:1,
        password:'',
        keyPrefix:'official-'
      }
    })
  ]
})
export class AppModule { }
```

#### 异步方式

``` typescript
import { Module } from '@nestjs/common';
import { OfficialModule } from '@lantsang/nestjs-official'
import { ConfigModule } from './modules/config/config.module';
import { CONFIG_PROVIDER } from './modules/config/constants/config.constant';
import { ConfigService } from './modules/config/services/config.service';

@Module({
  imports: [
    OfficialModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        appId: configService.official.appId,
        appSecret: configService.official.appSecret,
        authToken: configService.official.authToken,  // 当启用服务器配置时必填
        encodingAESKey: configService.official.encodingAESKey,  // 当启用服务器配置时必填
        redisOptions: configService.redis.official  // redisOptions 参数选填
      }),
      inject: [CONFIG_PROVIDER]
    }),
    ConfigModule
  ]
})
export class AppModule { }
```

> 提示：异步注册方式采用的 `ConfigModule` 并不是 `NestJS` 自带的配置功能，而是我基于官方自己设计的一套，具体实现请参考笔记：[NestJS配置模块设计](https://github.com/IricBing/note/blob/master/NodeJS/NestJS/%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1/%E9%85%8D%E7%BD%AE%E6%A8%A1%E5%9D%97%E8%AE%BE%E8%AE%A1/README.md)

## 文档地址

* [私有Gitlab](https://gitlab.lantsang.cn/nestjs-plugins/nestjs-official/tree/master/docs)
* [GitHub](https://github.com/lantsang/nestjs-official/tree/master/docs)
* [Gitee](https://gitee.com/lantsang/nestjs-official/tree/master/docs)

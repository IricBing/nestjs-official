import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSSDK_TICKET_PROVIDER, OPTIONS_PROVIDER, REDIS_CLIENT_PROVIDER } from '../constants/common.constant';
import { OFFICIAL_GET_JSSDK_TICKET_URL } from '../constants/official.constant';
import { JSSDK_TICKET_REDIS_KEY } from '../constants/redis.constant';
import { OfficialError } from '../errors/official.error';
import { JSSDKTicket } from '../interfaces/jssdk-ticket.interface';
import { OfficialModuleOptions } from '../interfaces/options.interface';
import { OfficialGetJSSDKTicketResponse } from '../interfaces/response/official/ticket/get-jssdk-ticket.official.response.interface';
import { OfficialUtil } from './official.util';

@Injectable()
export class TicketUtil {
  constructor(
    @Inject(JSSDK_TICKET_PROVIDER)
    private readonly jssdkTicket: JSSDKTicket,
    @Inject(REDIS_CLIENT_PROVIDER)
    private readonly redisClient: Redis,
    private readonly officialUtil: OfficialUtil,
    private readonly httpService: HttpService
  ) {}

  /** jssdk ticket 本地存储文件路径 */
  private readonly jssdkTicketFileName = './jssdk_ticket.txt';

  /** 获取 JSSDK Ticket */
  async getJSSDKTicket(): Promise<string> {
    if (this.redisClient) {
      const ticket = await this.redisClient.get(JSSDK_TICKET_REDIS_KEY);
      return ticket ?? this.renewJSSDKTicket();
    }

    if (!this.jssdkTicket || !this.jssdkTicket.ticket || this.jssdkTicket.expiresAt < Date.now() + 60 * 1000) {
      return this.renewJSSDKTicket();
    }

    return this.jssdkTicket.ticket;
  }

  private async renewJSSDKTicket(): Promise<string> {
    const { data } = await this.httpService
      .get<OfficialGetJSSDKTicketResponse>(OFFICIAL_GET_JSSDK_TICKET_URL, {
        params: {
          access_token: await this.officialUtil.getAccessToken(),
          type: 'jsapi'
        }
      })
      .toPromise();

    if (!data.errcode || data.errcode) throw new OfficialError(data.errmsg?.toString());

    if (this.redisClient) {
      await this.redisClient.setex(JSSDK_TICKET_REDIS_KEY, data.expires_in, data.ticket);
    } else {
      const fileContent = JSON.stringify({ ticket: data.ticket, expiresAt: Date.now() + data.expires_in * 1000 });
      writeFileSync(join(__dirname, this.jssdkTicketFileName), fileContent);
      this.jssdkTicket.ticket = data.ticket;
      this.jssdkTicket.expiresAt = Date.now() + data.expires_in * 1000;
    }

    return data.ticket;
  }
}

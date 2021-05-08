import { HttpService, Injectable } from '@nestjs/common';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class OfficialCustomMenuService {
  constructor(private readonly httpService: HttpService, private readonly officialUtil: OfficialUtil) {}
}

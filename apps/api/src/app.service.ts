import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
  getHi(): string {
    return 'Hi NestJS!'
  }
}

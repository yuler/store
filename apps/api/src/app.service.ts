import {Injectable} from '@nestjs/common'
import {PinoLogger} from 'nestjs-pino'

@Injectable()
export class AppService {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AppService.name)
  }

  home() {
    this.logger.info('home')
    return {
      message: 'TODO: output more ueseful information',
      docs: 'https://github.com/yuler/store/tree/main/apps/api',
    }
  }
}

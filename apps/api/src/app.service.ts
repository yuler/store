import {Injectable} from '@nestjs/common'

@Injectable()
export class AppService {
  home() {
    return {
      message: 'TODO: output more ueseful information',
      docs: 'https://github.com/yuler/store/tree/main/apps/api',
    }
  }
}

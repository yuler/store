import {Global, Module} from '@nestjs/common'
import {MiniApiService} from './mini-api.service'

@Global()
@Module({
  providers: [MiniApiService],
  exports: [MiniApiService],
})
export class MiniApiModule {}

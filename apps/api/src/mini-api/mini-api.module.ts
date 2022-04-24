import {Global, Module} from '@nestjs/common'
import {HttpModule} from '@nestjs/axios'
import {MiniApiService} from './mini-api.service'

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: 'https://api.weixin.qq.com',
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [MiniApiService],
  exports: [MiniApiService],
})
export class MiniApiModule {}

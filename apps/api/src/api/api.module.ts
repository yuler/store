import {Module} from '@nestjs/common'
import {HttpModule} from '@nestjs/axios'
import {AuthModule} from './auth/auth.module'
import {LoginController} from './login/login.controller'
import {ApiController} from './api.controller'
import {ApiService} from './api.service'
import {MiniApiService} from './mini-api.service'
import {LoginService} from './login/login.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: 'https://api.weixin.qq.com',
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    AuthModule,
  ],
  controllers: [ApiController, LoginController],
  providers: [ApiService, MiniApiService, LoginService],
})
export class ApiModule {}

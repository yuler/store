import {HttpService} from '@nestjs/axios'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import {firstValueFrom, map, Observable} from 'rxjs'

/**
 * Wrap some mini program apis
 *
 * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend
 */
@Injectable()
export class MiniApiService {
  private appId: string
  private appSecret: string
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.appId = this.configService.get<string>('APP_ID')
    this.appSecret = this.configService.get<string>('APP_SECRET')
  }

  /**
   * auth.code2Session
   *
   * @param code string
   * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   */
  jscode2session(code: string) {
    return firstValueFrom(
      this.httpService
        .post(
          `/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`,
        )
        .pipe(
          map(response => {
            return response.data
          }),
        ),
    )
  }
}

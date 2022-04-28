import {HttpService} from '@nestjs/axios'
import {AxiosResponse} from 'axios'
import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {Observable, map} from 'rxjs'

interface MiniApiResponse {
  errcode: number
  errmsg: string
  [key: string]: any
}

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
  code2Session(code: string): Observable<
    AxiosResponse<
      {
        openid: string
        session_key: string
        unionid?: string
      } & MiniApiResponse
    >
  > {
    return this.httpService.get(`/sns/jscode2session`, {
      params: {
        appid: this.appId,
        secret: this.appSecret,
        js_code: code,
        grant_type: 'authorization_code',
      },
    })
  }
}

import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import got, {Got} from 'got'

type MiniApiResponse<T = object> = Promise<
  T & {
    errcode: number
    errmsg: string
    [key: string]: any
  }
>

/**
 * Wrap some mini program apis
 *
 * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend
 */
@Injectable()
export class MiniApiService {
  private appId: string
  private appSecret: string
  private api: Got

  constructor(private configService: ConfigService) {
    this.appId = this.configService.get<string>('APP_ID')
    this.appSecret = this.configService.get<string>('APP_SECRET')

    this.api = got.extend({
      prefixUrl: 'https://api.weixin.qq.com',
      responseType: 'json',
      maxRedirects: 5,
      timeout: {
        request: 5000,
      },
      hooks: {
        afterResponse: [
          // Throw error when weixin api `errcode !== 0`
          response => {
            const {errcode, errmsg} = response.body as Awaited<MiniApiResponse>
            if (errcode !== 0) {
              throw new Error(errmsg)
            }
            return response
          },
        ],
      },
    })
  }

  /**
   * auth.code2Session
   *
   * @param code string
   * @link https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
   */
  code2Session(code: string): MiniApiResponse<{
    openid: string
    session_key: string
    unionid?: string
  }> {
    return this.api
      .get(`sns/jscode2session`, {
        searchParams: {
          appid: this.appId,
          secret: this.appSecret,
          js_code: code,
          grant_type: 'authorization_code',
        },
      })
      .json()
  }
}

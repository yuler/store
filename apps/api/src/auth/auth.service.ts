import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {map} from 'rxjs'
import {MiniApiService} from '../mini-api/mini-api.service'

@Injectable()
export class AuthService {
  constructor(
    private miniApiService: MiniApiService,
    private jwtService: JwtService,
  ) {}

  sign(payload: any) {
    return this.jwtService.sign(payload)
  }

  login(code: string) {
    return this.miniApiService.code2Session(code).pipe(
      map(({data}) => {
        console.log(data)
        if (data.errcode !== 0) {
          throw Error(data.errmsg)
        }
        const {session_key, openid} = data
        const accessToken = this.sign({session_key, openid})
        return {accessToken}
      }),
    )
  }
}

import {Injectable} from '@nestjs/common'
import {AuthService} from '../auth/auth.service'
import {MiniApiService} from '../mini-api.service'

@Injectable()
export class LoginService {
  constructor(
    private miniApiService: MiniApiService,
    private authService: AuthService,
  ) {}

  async login(code: string) {
    const {session_key, openid} = await this.miniApiService.jscode2session(code)
    const accessToken = this.authService.sign({session_key, openid})
    return {accessToken}
  }
}

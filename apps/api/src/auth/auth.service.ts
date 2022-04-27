import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
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

  async login(code: string) {
    const {session_key, openid} = await this.miniApiService.code2Session(code)
    const accessToken = this.sign({session_key, openid})
    return {accessToken}
  }
}

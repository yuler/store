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
    const {openid, session_key} = await this.miniApiService.code2Session(code)
    const accessToken = this.sign({openid, session_key})
    return {accessToken}
  }
}

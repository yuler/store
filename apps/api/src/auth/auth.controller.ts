import {Controller, Get, Query} from '@nestjs/common'
import {AuthService} from './auth.service'

@Controller('/auth')
export class AuthConroller {
  constructor(private loginService: AuthService) {}

  @Get('login')
  login(@Query() query: {code: string}) {
    const {code} = query
    return this.loginService.login(code)
  }
}

import {Controller, Get, Query} from '@nestjs/common'
import {LoginService} from './login.service'

@Controller('/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get()
  root(@Query() query: {code: string}) {
    const {code} = query
    return this.loginService.login(code)
  }
}

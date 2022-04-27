import {IsNotEmpty, IsString} from 'class-validator'
import {Controller, Get, Query} from '@nestjs/common'
import {AuthService} from './auth.service'

class getLoginDto {
  @IsString()
  @IsNotEmpty()
  public code: string
}

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  login(@Query() query: getLoginDto) {
    return this.authService.login(query.code)
  }
}

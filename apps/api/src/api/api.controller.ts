import {Controller, Get, UseGuards, Request} from '@nestjs/common'
import {JwtAuthGuard} from './auth/jwt-auth.guard'

@Controller('api')
export class ApiController {
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() req: any) {
    return req.user
  }
}

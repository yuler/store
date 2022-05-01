import {Global, Module} from '@nestjs/common'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {JwtStrategy} from './jwt.strategy'
import {ConfigService} from '@nestjs/config'

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: configService.get<string>('JWT_EXPIRES')},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

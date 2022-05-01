import {Test, TestingModule} from '@nestjs/testing'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {LoggerModule} from 'nestjs-pino'
import {MiniApiModule} from '../mini-api/mini-api.module'
import {PrismaModule} from '../prisma/prisma.module'

import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        LoggerModule.forRoot(),
        PrismaModule,
        MiniApiModule,
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
      providers: [AuthService],
    }).compile()

    authController = app.get<AuthController>(AuthController)
  })

  describe('login', () => {
    it('should throw error', async () => {
      const code = '061Dfyll2Znu394ndRml2jZ4U31Dfylo'
      await expect(authController.login({code})).rejects.toThrow(/invalid code/)
    })
  })
})

import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {LoggerModule} from 'nestjs-pino'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {MiniApiModule} from './mini-api/mini-api.module'
import {PrismaModule} from './prisma/prisma.module'
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    PrismaModule,
    MiniApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

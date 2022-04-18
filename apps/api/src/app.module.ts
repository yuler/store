import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {ApiModule} from './api/api.module'
import {PrismaService} from './prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

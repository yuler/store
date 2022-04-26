import {NestFactory} from '@nestjs/core'
import {Logger} from 'nestjs-pino'
import {AppModule} from './app.module'
import {PrismaService} from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  app.useLogger(app.get(Logger))

  // refs: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}
bootstrap()

import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {PrismaService} from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // refs: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}
bootstrap()

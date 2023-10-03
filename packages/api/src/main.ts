import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //use validation pipe
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3001)
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`Graphql is running on: ${await app.getUrl()}/graphql`)
}
bootstrap()

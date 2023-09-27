import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3001)
  console.info(`Server is running on: ${await app.getUrl()}`)
  console.info(`Graphql is running on: ${await app.getUrl()}/graphql`)
}
bootstrap()

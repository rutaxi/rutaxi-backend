import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './commons/filter/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors({
    origin: ['http://localhost:3000', 'https://*.gitpod.io', 'http://rutaxi.site'], // 리액트 애플리케이션이 실행되는 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  // app.useLogger(['log', 'error', 'warn', 'debug']);
  await app.listen(3001)
}
bootstrap()

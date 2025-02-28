import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan("tiny"))
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(4000);
}
bootstrap();

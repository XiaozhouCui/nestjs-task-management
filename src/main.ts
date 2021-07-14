import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create a new nestjs app with root module AppModule
  const app = await NestFactory.create(AppModule);
  // whenever there is a validation decorator, it goes to ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

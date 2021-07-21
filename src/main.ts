import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // initialise logger
  const logger = new Logger();
  // create a new nestjs app with root module AppModule
  const app = await NestFactory.create(AppModule);
  // whenever there is a validation decorator, it goes to ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  // use interceptor to transform JSON to exclude sensitive user information
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

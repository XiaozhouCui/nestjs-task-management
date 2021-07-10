import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create a new nestjs app with root module AppModule
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

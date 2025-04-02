import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.enableCors({
  //   origin: '*',  // Дозволяє доступ з усіх доменів
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Дозволяє ці методи
  //   allowedHeaders: 'Content-Type, Authorization',  // Дозволяє ці заголовки
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

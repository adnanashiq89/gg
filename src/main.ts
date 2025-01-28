import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 1748;
  await app.listen(port);
  console.log('app.listen on port:', port);
}
bootstrap();

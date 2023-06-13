import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://192.168.56.1:4500',
    credentials: true,
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

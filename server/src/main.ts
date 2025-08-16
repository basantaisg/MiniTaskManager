import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieparser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // your frontend
    credentials: true, // allow cookies
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieparser());
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();

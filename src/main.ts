import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './utils/array.extensions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Setup Swagger page on /api
  const config = new DocumentBuilder()
    .setTitle('Job Tracker API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api', app, document);
  await app.listen(3000);
}
bootstrap();

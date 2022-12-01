import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Inventory API - By SMBS')
    .setVersion('1.0')
    .addTag('SMBS')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(parseInt(process.env.API_PORT_DEV, 10) || 3000);
}
bootstrap();

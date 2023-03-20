import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DiskStorageOptions, StorageEngine } from 'multer';
import { join } from 'path';
import { HttpExceptionFilter } from './errors/AllExceptionsFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const cors = require('cors');
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  app.setGlobalPrefix('api/'); // ajoute un préfixe "api" à toutes les routes (http://localhost:3000/api)
  app.useGlobalPipes(new ValidationPipe()); // permet la prise en charge globale des Dto (toutes les routes utilisent des Dto s'ils existent)
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter()); // permet de gérer les erreurs de manières globales en utilisant un formalisme identique - créé dans le dossier "errors"
  const config = new DocumentBuilder() // configuration de l'API pour Swagger

    .setTitle('product')
    .setDescription('product API description')
    .setVersion('1.0')
    .addTag('product')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  
  await app.listen(3000);
}
bootstrap();

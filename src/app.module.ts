import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Product],
      synchronize: true,
    }),
    MulterModule.register({
        dest: './upload',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, `..`, `upload`)
    }),

    ProductModule,

  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_PIPE, useClass: ValidationPipe}],
})
export class AppModule {}

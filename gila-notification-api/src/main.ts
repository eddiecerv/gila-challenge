import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { constants } from 'zlib';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Gila API Notifications')
    .setDescription('API for Notifications for Gila Challenge')
    .setVersion('1.0')
    .addTag('notifications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.register(helmet);
  await app.register(compression, {
    brotliOptions: { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } },
    encodings: ['gzip', 'deflate'],
  });

  await app.listen(PORT);
}
bootstrap();

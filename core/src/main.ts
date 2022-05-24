import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  app.useGlobalInterceptors(new ResponseInterceptor())

  app.use(helmet())

  app
    .use((req, res, next) => {
        res.header("x-powered-by", "lxsky")
        next()
    })
    .use(cookieParser())

  app
    .enableVersioning({
        type: VersioningType.URI
    })
    .enableCors({
        credentials: true,
        origin: config.get("sys.frontendUrl"),
    });

  await app.listen(3000);
}
bootstrap();

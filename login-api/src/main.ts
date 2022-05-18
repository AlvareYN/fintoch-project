import { HttpException, HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/exception.filter';
async function bootstrap() {

  Logger.log(`App running on port ${process.env.PORT}`);

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      Logger.error(errors);
      return new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
  }));

  await app.listen(process.env.PORT || 4000);
}

bootstrap();

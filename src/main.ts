import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

// LOGGER
import * as rTracer from 'cls-rtracer';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import createOptions from '@/logger/winston';

// CUSTOM CODE
import { AppModule } from '@/app/app.module';
import { FinalFilter } from '@/common/filters/final.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(createOptions({ fileName: 'boots' })),
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    methods: ['GET', 'PATCH', 'DELETE', 'POST', 'PUT'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });

  app.useGlobalFilters(new FinalFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.use(helmet());
  app.use(rTracer.expressMiddleware());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

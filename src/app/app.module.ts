import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';

// CONFIGURATION
import configuration from '@/configuration';

// LOGGER
import { WinstonModule } from 'nest-winston';
import createOptions from '@/logger/winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    WinstonModule.forRoot(createOptions({ fileName: 'main' })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

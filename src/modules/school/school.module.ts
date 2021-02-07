import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { School } from '@/entities';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [TypeOrmModule.forFeature([School]), SectionModule],
  providers: [SchoolService],
  controllers: [SchoolController],
  exports: [SchoolService]
})
export class SchoolModule { }

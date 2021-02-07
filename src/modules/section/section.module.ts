import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Enrollment, Section } from '@/entities';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Enrollment]), PersonModule],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService]
})
export class SectionModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Section } from '@/entities';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { PersonService } from '../person/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), PersonService],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService]
})
export class SectionModule { }

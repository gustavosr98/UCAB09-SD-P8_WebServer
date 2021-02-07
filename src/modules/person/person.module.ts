import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Enrollment, Faculty, Person, School, Section } from '@/entities';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Faculty, Person, School, Section] )],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService]
})
export class PersonModule { }

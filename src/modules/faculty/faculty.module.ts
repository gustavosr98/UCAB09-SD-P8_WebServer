import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Faculty } from '@/entities';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';

import {SchoolModule} from '../school/school.module'

@Module({
  imports: [TypeOrmModule.forFeature([Faculty]), SchoolModule],
  providers: [FacultyService],
  controllers: [FacultyController],
  exports: [FacultyService]
})
export class FacultyModule { }

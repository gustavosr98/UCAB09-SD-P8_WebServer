import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Faculty } from '@/entities';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  providers: [FacultyService],
  controllers: [FacultyController],
  exports: [FacultyService]
})
export class FacultyModule { }

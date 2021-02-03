import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Enrollment } from '@/entities';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  providers: [EnrollmentService],
  controllers: [EnrollmentController],
  exports: [EnrollmentService]
})
export class EnrollmentModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Enrollment } from '@/entities';
import { EnrollmentService } from '@/modules/enrollment/enrollment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  providers: [EnrollmentService],
  exports: [EnrollmentService]
})
export class EnrollmentModule { }

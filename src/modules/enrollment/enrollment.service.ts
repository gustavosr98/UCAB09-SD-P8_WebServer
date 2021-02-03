import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Enrollment, Section } from '@/entities';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async post(enrollment: Partial<Enrollment>, section: Partial<Section>): Promise<Enrollment> {
        this.log.debug(`EnrollmentService - create a enrollment of person=${enrollment.person.id} in section=${section.id}`);
        const sectionEnrollment = section.enrollments.filter((se) => se.id = enrollment.id)
        if (sectionEnrollment) {
            this.log.debug(`EnrollmentService - person=${enrollment.person.id} is already enrolled in section=${section.id}`);
            throw new BadRequestException(`person=${enrollment.person.id} is already enrolled in section=${section.id}`);
        } else{
            return await this.enrollmentRepository.save(enrollment);
        }
    }

    public async delete(id: number): Promise<DeleteResult> {
        this.log.debug(`EnrollmentService - delete enrollment with id=${id}`);
        return await this.enrollmentRepository.delete(id);
    }
}

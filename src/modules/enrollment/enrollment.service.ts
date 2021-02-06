import { SectionService } from './../section/section.service';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Enrollment, Section, Status } from '@/entities';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        private readonly sectionService: SectionService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async post(enrollment: Partial<Enrollment>, section: Partial<Section>): Promise<Enrollment> {
        this.log.debug(`EnrollmentService - create a enrollment of person=${enrollment.person.id} in section=${section.id}`);
        const sect = await this.sectionService.getOne(section.id)
        const sectionEnrollment = sect.enrollments.filter((se) => se.id = enrollment.id)
        if (sectionEnrollment) {
            this.log.debug(`EnrollmentService - person=${enrollment.person.id} is already enrolled in section=${section.id}`);
            throw new BadRequestException(`person=${enrollment.person.id} is already enrolled in section=${section.id}`);
        } else{
            enrollment.sections = [sect]
            return await this.enrollmentRepository.save(enrollment);
        }
    }

    public async delete(id: number): Promise<UpdateResult> {
        this.log.debug(`EnrollmentService - delete enrollment with id=${id}`);
        return await this.enrollmentRepository.update(id, { status: Status.ENABLED, deleted_date: (new Date()).toISOString() });
    }
}

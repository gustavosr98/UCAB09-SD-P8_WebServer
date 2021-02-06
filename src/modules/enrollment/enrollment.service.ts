import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Enrollment, EnrollmentType, Person, Section, Status } from '@/entities';
import { PersonService } from './../person/person.service';
import { SectionService } from './../section/section.service';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        private readonly sectionService: SectionService,
        private readonly personService: PersonService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async post(person: Partial<Person>, sections: Partial<Section>[]): Promise<Enrollment> {
        this.log.debug(`EnrollmentService - create a enrollment of person=${person.id}`);
        const per = await this.personService.getOne(person.id)
        let enrollment: Partial<Enrollment> = {
            sections: [],
            created_date: (new Date()).toISOString(),
            status: Status.ENABLED,
            person: per
        }
        let allowed: boolean = false
        sections.forEach(async (section) => {
            const sect = await this.sectionService.getOne(section.id)
            const sectionEnrollment = sect.enrollments.filter((enrollment) => enrollment.person.id === person.id)

            if (sectionEnrollment) {
                this.log.debug(`EnrollmentService - person=${enrollment.person.id} is already enrolled in section=${sect.id}`);
            } else{
                enrollment.sections.push(sect)
                allowed = true
            }   
        })
        if (allowed) return await this.enrollmentRepository.save(enrollment);
        else throw new BadRequestException(`person=${person.id} is already enrolled in all the sections`);
    }

    public async delete(id: number): Promise<UpdateResult> {
        this.log.debug(`EnrollmentService - delete enrollment with id=${id}`);
        return await this.enrollmentRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
    }
}

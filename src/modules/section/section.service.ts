import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Enrollment, EnrollmentType, Section, Status } from '@/entities';
import { PersonService } from '../person/person.service';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private readonly sectionRepository: Repository<Section>,
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        private readonly personService: PersonService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async get(): Promise<Section[]> {
        this.log.debug(`SectionService - get all the sections`);
        return await this.sectionRepository.find();
    }

    public async getOne(id: number): Promise<Section> {
        this.log.debug(`SectionService - get a section with id=${id}`);
        return await this.sectionRepository.findOne(id, { relations: ['enrollments'] });
    }

    public async post(section: Partial<Section>): Promise<Section> {
        this.log.debug(`SectionService - create a section with name=${section.name}`);
        return await this.sectionRepository.save(section);
    }

    public async update(id: number, section: Partial<Section>): Promise<UpdateResult> {
        this.log.debug(`SectionService - update section with id=${id}`);
        return await this.sectionRepository.update(id, section);
    }

    public async delete(id: number): Promise<UpdateResult> {
        this.log.debug(`SectionService - delete section with id=${id}`);
        return await this.sectionRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
    }

    public async getPersonsBySection(id: number, type: EnrollmentType) {
        this.log.debug(`SectionService - get all persons the section with id=${id}`);
        return await this.sectionRepository.query(`
            SELECT p.* 
            FROM section s, person p, enrollment e, section_enrollments_enrollment se
            WHERE s = ${id}
                AND se.sectionId = s.id
                AND se.enrollmentId = e.id
                ${type && `AND e.type = ${type}`}
                AND e.person = p.id
        `)
    }

    public async postPersonInSection(personId: number, sectionId: number): Promise<Enrollment> {
        this.log.debug(`SectionService - create a enrollment of person=${personId} in section=${sectionId}`);
        const per = await this.personService.getOne(personId)
        const sect = await this.getOne(sectionId)
        const sectionEnrollment = sect.enrollments.filter((enrollment) => enrollment.person.id === personId)

        if (sectionEnrollment) {
            this.log.debug(`SectionService - person=${personId} is already enrolled in section=${sectionId}`);
            throw new BadRequestException(`person=${personId} is already enrolled in the section=${sectionId}`);
        } else{
            let enrollment: Partial<Enrollment> = {
                sections: [sect],
                person: per
            }
            return await this.enrollmentRepository.save(enrollment);
        }   
    }

    public async deletePersonInSection(id: number): Promise<UpdateResult> {
        this.log.debug(`SectionService - delete enrollment with id=${id}`);
        return await this.enrollmentRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
    }
}

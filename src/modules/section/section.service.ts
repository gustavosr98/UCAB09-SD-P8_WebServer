import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Enrollment, EnrollmentType, Person, School, Section, Status } from '@/entities';
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
        return await this.sectionRepository.findOneOrFail(id, { relations: ['enrollments'] });
    }

    public async post(school: School, section: Partial<Section>): Promise<Section> {
        this.log.debug(`SectionService - create a section with name=${section.name}`);
        section.school = school
        return await this.sectionRepository.save(section);
    }

    public async update(id: number, section: Partial<Section>): Promise<Section> {
        this.log.debug(`SectionService - update section with id=${id}`);
        await this.sectionRepository.findOneOrFail(id)
        await this.sectionRepository.update(id,section)
        return this.sectionRepository.findOne(id)
    }

    public async delete(id: number): Promise<any> {
        this.log.debug(`SectionService - delete section with id=${id}`);
        await this.sectionRepository.findOneOrFail(id)
        await this.sectionRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
        return null;
    }

    public async getPersonsBySection(id: number, type : EnrollmentType) : Promise<Person[]>{
        this.log.debug(`SectionService - get all persons the section with id=${id}`);
        const sect = await this.getOne(id)

        let persons : Person[] = []

        sect.enrollments.map((enrollment) => {
            if (enrollment.status === Status.ENABLED && enrollment.type === type)
                persons.push(enrollment.person)
        })

        return persons

        /* return await this.sectionRepository.query(`
            SELECT p.* 
            FROM section s, person p, enrollment e, section_enrollments_enrollment se
            WHERE s = ${id}
                AND se.sectionId = s.id
                AND se.enrollmentId = e.id
                ${type && `AND e.type = ${type}`}
                AND e.person = p.id
        `) */
    }

    public async postPersonInSection(personId: number, sectionId: number, type : Partial<Enrollment>): Promise<Enrollment> {
        this.log.debug(`SectionService - create a enrollment of person=${personId} in section=${sectionId}`);
        const per = await this.personService.getOne(personId)
        const sect = await this.getOne(sectionId)

        let sectionEnrollment = sect.enrollments.find((enrollment) => enrollment.person.id === per.id && enrollment.status === Status.ENABLED)

        if (sectionEnrollment) {
            this.log.debug(`SectionService - person=${personId} is already enrolled in section=${sectionId}`);
            throw new BadRequestException(`person=${personId} is already enrolled in the section=${sectionId}`);
        } else {
            let enrollment: Enrollment =  new Enrollment()
            enrollment.person = per
            enrollment.sections = [sect]
            enrollment.type = type.type
            return await this.enrollmentRepository.save(enrollment); 
        }
    }

    public async deletePersonInSection(sectionId : number, personId: number): Promise<any> {
        this.log.debug(`SectionService - delete enrollment of person=${personId} in section=${sectionId}`);
        const per = await this.personService.getOne(personId)
        const sect = await this.getOne(sectionId)

        let sectionEnrollment = sect.enrollments.find((enrollment) => enrollment.person.id === per.id && enrollment.status === Status.ENABLED)

        if (sectionEnrollment) {
            await this.enrollmentRepository.update(sectionEnrollment.id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });   
            return null;
        } else {
            this.log.debug(`SectionService - person=${personId} is not enrolled in section=${sectionId}`);
            throw new BadRequestException(`person=${personId} is not enrolled in the section=${sectionId}`);
        }
    }

    /* public async deletePersonInSection(id: number): Promise<UpdateResult> {
        this.log.debug(`SectionService - delete enrollment with id=${id}`);
        return await this.enrollmentRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
    } */

    public async getFromSchools(school: School): Promise<Section[]> {
        return await this.sectionRepository.find({school: school});
    }
}

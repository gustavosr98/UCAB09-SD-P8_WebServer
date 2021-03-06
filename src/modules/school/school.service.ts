import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Faculty, School, Status } from '@/entities';

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(School)
        private readonly schoolRepository: Repository<School>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async get(): Promise<School[]> {
        this.log.debug(`SchoolService - get all the schools`);
        return await this.schoolRepository.find();
    }

    public async getOne(id: number): Promise<School> {
        this.log.debug(`SchoolService - get a school with id=${id}`);
        return await this.schoolRepository.findOneOrFail(id);
    }

    public async post(faculty: Faculty,school: Partial<School>): Promise<School> {
        this.log.debug(`SchoolService - create a school with name=${school.name}`);
        school.faculty = faculty
        return await this.schoolRepository.save(school);
    }

    public async update(id: number, school: Partial<School>): Promise<School> {
        this.log.debug(`SchoolService - update school with id=${id}`);
        await this.schoolRepository.findOneOrFail(id)
        await this.schoolRepository.update(id,school)
        return this.schoolRepository.findOne(id)
    }

    public async delete(id: number): Promise<any> {
        this.log.debug(`SchoolService - delete school with id=${id}`);
        await this.schoolRepository.findOneOrFail(id)
        await this.schoolRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
        return null;
    }

    public async getFromFacultie(faculty: Faculty): Promise<School[]> {
        return await this.schoolRepository.find({faculty: faculty});
    }
}

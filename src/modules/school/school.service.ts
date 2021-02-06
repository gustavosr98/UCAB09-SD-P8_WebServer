import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { School, Status } from '@/entities';

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
        return await this.schoolRepository.findOne(id);
    }

    public async post(school: Partial<School>): Promise<School> {
        this.log.debug(`SchoolService - create a school with name=${school.name}`);
        school.created_date = (new Date()).toISOString()
        school.status = Status.ENABLED
        return await this.schoolRepository.save(school);
    }

    public async update(id: number, school: Partial<School>): Promise<UpdateResult> {
        this.log.debug(`SchoolService - update school with id=${id}`);
        return await this.schoolRepository.update(id, school);
    }

    public async delete(id: number): Promise<UpdateResult> {
        this.log.debug(`SchoolService - delete school with id=${id}`);
        return await this.schoolRepository.update(id, { status: Status.ENABLED, deleted_date: (new Date()).toISOString() });
    }
}

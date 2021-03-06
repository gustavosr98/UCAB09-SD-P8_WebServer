import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Faculty, Status } from '@/entities';

@Injectable()
export class FacultyService {
    constructor(
        @InjectRepository(Faculty)
        private readonly facultyRepository: Repository<Faculty>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async get(): Promise<Faculty[]> {
        this.log.debug(`FacultyService - get all the faculties`);
        return await this.facultyRepository.find();
    }

    public async getOne(id: number): Promise<Faculty> {
        this.log.debug(`FacultyService - get a faculty with id=${id}`);
        return await this.facultyRepository.findOneOrFail(id);
    }

    public async post(faculty: Partial<Faculty>): Promise<Faculty> {
        this.log.debug(`FacultyService - create a faculty with name=${faculty.name}`);
        return await this.facultyRepository.save(faculty);
    }

    public async update(id: number, faculty: Partial<Faculty>): Promise<Faculty> {
        this.log.debug(`FacultyService - update faculty with id=${id}`);
        const original : Faculty = await this.facultyRepository.findOneOrFail(id)
        await this.facultyRepository.update(id,faculty)
        return this.facultyRepository.findOne(id)

    } 

    public async delete(id: number): Promise<any> {
        this.log.debug(`FacultyService - delete faculty with id=${id}`);
        const original : Faculty = await this.facultyRepository.findOneOrFail(id)
        await this.facultyRepository.update(id, { status: Status.DISABLED, deleted_date: (new Date()).toISOString() });
        return null;
    }
}

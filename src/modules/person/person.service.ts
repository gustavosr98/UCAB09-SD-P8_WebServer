import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Person, Status } from '@/entities';

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly log: Logger,
    ) {}

    public async get(): Promise<Person[]> {
        this.log.debug(`PersonService - get all the persons`);
        return await this.personRepository.find();
    }

    public async getOne(id: number): Promise<Person> {
        this.log.debug(`PersonService - get a person with id=${id}`);
        return await this.personRepository.findOne(id);
    }

    public async post(person: Partial<Person>): Promise<Person> {
        this.log.debug(`PersonService - create a person with name=${person.first_name}`);
        person.created_date =(new Date()).toISOString()
        return await this.personRepository.save(person);
    }

    public async update(id: number, person: Partial<Person>): Promise<UpdateResult> {
        this.log.debug(`PersonService - update person with id=${id}`);
        return await this.personRepository.update(id, person);
    }

    public async delete(id: number): Promise<UpdateResult> {
        this.log.debug(`PersonService - delete person with id=${id}`);
        return await this.personRepository.update(id, { status: Status.ENABLED, deleted_date: (new Date()).toISOString() });
    }
}

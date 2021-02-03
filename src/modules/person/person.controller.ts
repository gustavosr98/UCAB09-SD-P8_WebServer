import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { PersonService } from './person.service';
import { Person } from '@/entities';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @Get()
    async get(): Promise<Person[]> {
        return await this.personService.get();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Person> {
        return await this.personService.getOne(id);
    }

    @Post()
    async post(@Body() person: Partial<Person>): Promise<Person> {
        return await this.personService.post(person);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() person: Partial<Person>): Promise<UpdateResult> {
        return await this.personService.update(id, person);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.personService.delete(id);
    }
}

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import {ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam ,ApiBody} from '@nestjs/swagger';

import { PersonService } from './person.service';
import { Person } from '@/entities';

@ApiTags('Persons')
@Controller('persons')
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @ApiOperation({summary: 'List all Persons' })
    @ApiResponse({
        status: 200,
        description: 'List of all persons registered in the system',
        type: [Person]})
    @Get()
    async get(): Promise<Person[]> {
        return await this.personService.get();
    }

    @ApiOperation({summary: 'Retrieve a specific person' })
    @ApiResponse({
        status: 200,
        description: 'Faculty',
        type: Person})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Person not found in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Person> {
        return await this.personService.getOne(id);
    }

    @ApiOperation({summary: 'Create a new person' })
    @ApiResponse({
        status: 200,
        description: 'Created Person',
        type: Person})
    @ApiBadRequestResponse({
        status: 400,
        description: 'Missing elements in body'})
    @ApiBody({
        type: Person
    })
    @Post()
    async post(@Body() person: Partial<Person>): Promise<Person> {
        return await this.personService.post(person);
    }

    @ApiOperation({summary: 'Modify an existent Person' })
    @ApiResponse({
        status: 200,
        description: 'Modified Person',
        type: Person})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Person not found in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiBody({
        type: Person
    })
    @Put(':id')
    async update(@Param('id') id: number, @Body() person: Partial<Person>): Promise<Person> {
        return await this.personService.update(id, person);
    }

    @ApiOperation({summary: 'Delete an existent Person' })
    @ApiResponse({
        status: 200,
        description: 'Deleted Person',
        type: null})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Person not found in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.personService.delete(id);
    }
}

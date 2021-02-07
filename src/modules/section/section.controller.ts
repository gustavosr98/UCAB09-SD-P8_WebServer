import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { SectionService } from './section.service';
import { Enrollment, EnrollmentType, Person, Section } from '@/entities';

import {ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam ,ApiBody, ApiQuery} from '@nestjs/swagger';

@ApiTags('Sections')
@Controller('sections')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @ApiOperation({summary: 'List all Sections Registered' })
    @ApiResponse({
        status: 200,
        description: 'List of all active faculties',
        type: [Section]})
    @Get()
    async get(): Promise<Section[]> {
        return await this.sectionService.get();
    }

    @ApiOperation({summary: 'Retrieve a specific Section' })
    @ApiResponse({
        status: 200,
        description: 'Section',
        type: Section})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Section not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Section> {
        return await this.sectionService.getOne(id);
    }

    @ApiOperation({summary: 'Modify an existent Section' })
    @ApiResponse({
        status: 200,
        description: 'Modified Section',
        type: Section})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Section not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiBody({
        type: Section
    })
    @Put(':id')
    async update(@Param('id') id: number, @Body() section: Partial<Section>): Promise<Section> {
        return await this.sectionService.update(id, section);
    }

    @ApiOperation({summary: 'Delete an existent Section' })
    @ApiResponse({
        status: 200,
        description: 'Deleted Section',
        type: null})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Section not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.sectionService.delete(id);
    }

    // PERSONS RELATED END-POINTS

    @ApiOperation({summary: 'List of Person enrolled in a Section by type' })
    @ApiResponse({
        status: 200,
        description: 'List of Person by type',
        type: [Person]})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Section not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiQuery({
        name: 'type',
        enum: EnrollmentType
    })
    @Get(':id/persons')
    async getPersons(@Param('id') id: number, @Query('type') type: EnrollmentType): Promise<Person[]> {
        return await this.sectionService.getPersonsBySection(id, type);
    }

    @ApiOperation({summary: 'Enroll a Person in a Section' })
    @ApiResponse({
        status: 200,
        description: 'Enrollment of Person in Section',
        type: Enrollment})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Section or Person not register in the system'})
    @ApiParam({
        name: 'sectionId',
        required: true
    })
    @ApiParam({
        name: 'sectionId',
        required: true
    })
    @ApiBody({
        type: Enrollment
    })
    @Post(':sectionId/persons/:personId')
    async postPersonInSection(
        @Param('sectionId') sectionId: number,
        @Param('personId') personId: number,
        @Body() type: Partial<Enrollment>): Promise<Enrollment> {
        return await this.sectionService.postPersonInSection(personId, sectionId, type);
    }

    /* @Delete(':id')
    async deletePersonInSection(@Param('id') id: number): Promise<UpdateResult> {
        return await this.sectionService.deletePersonInSection(id);
    } */

    @ApiOperation({summary: 'Delete a Person from a Section' })
    @ApiResponse({
        status: 200,
        description: 'Deletion of Person in Section',
        type: null})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Section or Person not register in the system'})
    @ApiParam({
        name: 'sectionId',
        required: true
    })
    @ApiParam({
        name: 'sectionId',
        required: true
    })
    @Delete(':sectionId/persons/:personId')
    async deletePersonInSection(@Param('sectionId') sectionId: number, @Param('personId') personId: number): Promise<any> {
        return await this.sectionService.deletePersonInSection(sectionId,personId);
    }
}

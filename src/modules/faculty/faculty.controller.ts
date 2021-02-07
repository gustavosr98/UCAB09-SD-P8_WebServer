import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';

import { FacultyService } from './faculty.service';
import { Faculty, School } from '@/entities';
import { SchoolService } from '../school/school.service';

import {ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam ,ApiBody} from '@nestjs/swagger';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultyController {
    constructor(
        private readonly facultyService: FacultyService,
        private readonly schoolService: SchoolService,
        ) {}
    
    @ApiOperation({summary: 'List all faculties' })
    @ApiResponse({
        status: 200,
        description: 'List of all active faculties',
        type: [Faculty]})
    @Get()
    async get(): Promise<Faculty[]> {
        return await this.facultyService.get();
    }

    @ApiOperation({summary: 'Retrieve a specific faculty' })
    @ApiResponse({
        status: 200,
        description: 'Faculty',
        type: Faculty})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Faculty not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Faculty> {
        return await this.facultyService.getOne(id);
    }

    @ApiOperation({summary: 'Create a new faculty' })
    @ApiResponse({
        status: 200,
        description: 'Created Faculty',
        type: Faculty})
    @ApiBadRequestResponse({
        status: 400,
        description: 'Missing elements in body'})
    @ApiBody({
        type: Faculty
    })
    @Post()
    async post(@Body() faculty: Partial<Faculty>): Promise<Faculty> {
        return await this.facultyService.post(faculty);
    }

    @ApiOperation({summary: 'Modify an existent Faculty' })
    @ApiResponse({
        status: 200,
        description: 'Modified Faculty',
        type: Faculty})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Faculty not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiBody({
        type: Faculty
    })
    @Put(':id')
    async update(@Param('id') id: number, @Body() faculty: Partial<Faculty>): Promise<Faculty> {
        return await this.facultyService.update(id, faculty);
    }

    @ApiOperation({summary: 'Delete an existent faculty' })
    @ApiResponse({
        status: 200,
        description: 'Deleted Faculty',
        type: null})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Faculty not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.facultyService.delete(id);
    }

    // SCHOOLS
    @ApiOperation({summary: 'List all active Schools of a Faculty' })
    @ApiResponse({
        status: 200,
        description: 'List of schools',
        type: [School]})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Faculty not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Get(':id/schools')
    async getSchools(@Param('id') id: number): Promise<School[]> {
        return await this.schoolService.getFromFacultie(await this.getOne(id));
    }

    @ApiOperation({summary: 'Create a new school in a faculty' })
    @ApiResponse({
        status: 200,
        description: 'Created School',
        type: School})
    @ApiBadRequestResponse({
        status: 404,
        description: 'Faculty not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiBody({
        type: School
    })
    @Post(':id/schools')
    async postSchool(@Param('id') id: number, @Body() school: Partial<School>): Promise<School> {
        return await this.schoolService.post(await this.getOne(id), school);
    }
}

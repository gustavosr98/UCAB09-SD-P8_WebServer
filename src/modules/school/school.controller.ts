import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { SchoolService } from './school.service';

import { School, Section } from '@/entities';
import { SectionService } from '../section/section.service';

import {ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiParam ,ApiBody} from '@nestjs/swagger';

@ApiTags('Schools')
@Controller('schools')
export class SchoolController {
    constructor(
        private readonly schoolService: SchoolService,
        private readonly sectionService: SectionService
        ) {}

    @ApiOperation({summary: 'List all Schools' })
    @ApiResponse({
        status: 200,
        description: 'List of all active Schools',
        type: [School]})
    @Get()
    async get(): Promise<School[]> {
        return await this.schoolService.get();
    }

    @ApiOperation({summary: 'Retrieve a specific School' })
    @ApiResponse({
        status: 200,
        description: 'School',
        type: School})
    @ApiBadRequestResponse({
        status: 404,
        description: 'School not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<School> {
        return await this.schoolService.getOne(id);
    }

    @ApiOperation({summary: 'Modify an existent School' })
    @ApiResponse({
        status: 200,
        description: 'Modified School',
        type: School})
    @ApiBadRequestResponse({
        status: 404,
        description: 'School not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiBody({
        type: School
    })
    @Put(':id')
    async update(@Param('id') id: number, @Body() school: Partial<School>): Promise<School> {
        return await this.schoolService.update(id, school);
    }

    @ApiOperation({summary: 'Delete an existent School' })
    @ApiResponse({
        status: 200,
        description: 'Deleted School',
        type: null})
    @ApiBadRequestResponse({
        status: 404,
        description: 'School not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.schoolService.delete(id);
    }

    // SECTIONS
    @ApiOperation({summary: 'List all active Sections of a School' })
    @ApiResponse({
        status: 200,
        description: 'List of Sections',
        type: [Section]})
    @ApiBadRequestResponse({
        status: 404,
        description: 'School not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @Get(':id/sections')
    async getSchools(@Param('id') id: number): Promise<Section[]> {
        return await this.sectionService.getFromSchools(await this.getOne(id));
    }

    @ApiOperation({summary: 'Create a new Section in a School' })
    @ApiResponse({
        status: 200,
        description: 'Created Section',
        type: Section})
    @ApiBadRequestResponse({
        status: 404,
        description: 'School not register in the system'})
    @ApiParam({
        name: 'id',
        required: true
    })
    @ApiBody({
        type: Section
    })
    @Post(':id/sections')
    async postSection(@Param('id') id: number, @Body() section: Partial<Section>): Promise<Section> {
        return await this.sectionService.post(await this.getOne(id), section);
    }
}

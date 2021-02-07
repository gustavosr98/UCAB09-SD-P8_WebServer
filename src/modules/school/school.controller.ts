import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { SchoolService } from './school.service';

import { School, Section } from '@/entities';
import { SectionService } from '../section/section.service';

@Controller('schools')
export class SchoolController {
    constructor(
        private readonly schoolService: SchoolService,
        private readonly sectionService: SectionService
        ) {}

    @Get()
    async get(): Promise<School[]> {
        return await this.schoolService.get();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<School> {
        return await this.schoolService.getOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() school: Partial<School>): Promise<School> {
        return await this.schoolService.update(id, school);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.schoolService.delete(id);
    }

    // SECTIONS
    @Get(':id/sections')
    async getSchools(@Param('id') id: number): Promise<Section[]> {
        return await this.sectionService.getFromSchools(await this.getOne(id));
    }

    @Post(':id/sections')
    async postSection(@Param('id') id: number, @Body() section: Partial<Section>): Promise<Section> {
        return await this.sectionService.post(await this.getOne(id), section);
    }
}

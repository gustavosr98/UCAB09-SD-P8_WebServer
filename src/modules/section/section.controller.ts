import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { SectionService } from './section.service';
import { Enrollment, EnrollmentType, Section } from '@/entities';

@Controller('sections')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {}

    @Get()
    async get(): Promise<Section[]> {
        return await this.sectionService.get();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Section> {
        return await this.sectionService.getOne(id);
    }

    @Post()
    async post(@Body() section: Partial<Section>): Promise<Section> {
        return await this.sectionService.post(section);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() section: Partial<Section>): Promise<UpdateResult> {
        return await this.sectionService.update(id, section);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<UpdateResult> {
        return await this.sectionService.delete(id);
    }

    @Get(':id/persons')
    async getStudents(@Param('id') id: number) {
        return await this.sectionService.getPersonsBySection(id, EnrollmentType.TEACHER);
        return await this.sectionService.getPersonsBySection(id, EnrollmentType.STUDENT);
    }

    @Post(':sectionId/person/:personId')
    async postPersonInSection(@Param('sectionId') sectionId: number, @Param('personId') personId: number): Promise<Enrollment> {
        return await this.sectionService.postPersonInSection(personId, sectionId);
    }

    @Delete(':id')
    async deletePersonInSection(@Param('id') id: number): Promise<UpdateResult> {
        return await this.sectionService.deletePersonInSection(id);
    }
}

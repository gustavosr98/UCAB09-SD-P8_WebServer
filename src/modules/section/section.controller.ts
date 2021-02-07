import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
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

    @Put(':id')
    async update(@Param('id') id: number, @Body() section: Partial<Section>): Promise<Section> {
        return await this.sectionService.update(id, section);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.sectionService.delete(id);
    }

    @Get(':id/persons')
    async getPersons(@Param('id') id: number, @Query('type') type?: EnrollmentType) {
        return await this.sectionService.getPersonsBySection(id, type);
    }

    // PERSONS RELATED END-POINTS

    @Post(':sectionId/persons/:personId')
    async postPersonInSection(@Param('sectionId') sectionId: number, @Param('personId') personId: number): Promise<Enrollment> {
        return await this.sectionService.postPersonInSection(personId, sectionId);
    }

    /* @Delete(':id')
    async deletePersonInSection(@Param('id') id: number): Promise<UpdateResult> {
        return await this.sectionService.deletePersonInSection(id);
    } */

    @Delete(':sectionId/persons/:personId')
    async deletePersonInSection(@Param('sectionId') sectionId: number, @Param('personId') personId: number): Promise<any> {
        return await this.sectionService.deletePersonInSection(sectionId,personId);
    }
}

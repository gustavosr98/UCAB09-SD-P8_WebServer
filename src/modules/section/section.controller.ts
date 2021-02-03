import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { SectionService } from './section.service';
import { Section } from '@/entities';

@Controller('section')
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
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.sectionService.delete(id);
    }
}
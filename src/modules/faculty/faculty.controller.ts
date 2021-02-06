import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { FacultyService } from './faculty.service';
import { Faculty } from '@/entities';

@Controller('faculty')
export class FacultyController {
    constructor(private readonly facultyService: FacultyService) {}

    @Get()
    async get(): Promise<Faculty[]> {
        return await this.facultyService.get();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<Faculty> {
        return await this.facultyService.getOne(id);
    }

    @Post()
    async post(@Body() faculty: Partial<Faculty>): Promise<Faculty> {
        return await this.facultyService.post(faculty);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() faculty: Partial<Faculty>): Promise<UpdateResult> {
        return await this.facultyService.update(id, faculty);
    }

    @Put(':id')
    async delete(@Param('id') id: number): Promise<UpdateResult> {
        return await this.facultyService.delete(id);
    }
}

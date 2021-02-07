import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';

import { FacultyService } from './faculty.service';
import { Faculty, School } from '@/entities';
import { SchoolService } from '../school/school.service';

@Controller('faculties')
export class FacultyController {
    constructor(
        private readonly facultyService: FacultyService,
        private readonly schoolService: SchoolService,
        ) {}

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
    async update(@Param('id') id: number, @Body() faculty: Partial<Faculty>): Promise<Faculty> {
        return await this.facultyService.update(id, faculty);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return await this.facultyService.delete(id);
    }

    // SCHOOLS
    @Get(':id/schools')
    async getSchools(@Param('id') id: number): Promise<School[]> {
        return await this.schoolService.getFromFacultie(await this.getOne(id));
    }

    @Post(':id/schools')
    async postSchool(@Param('id') id: number, @Body() school: Partial<School>): Promise<School> {
        return await this.schoolService.post(await this.getOne(id), school);
    }
}

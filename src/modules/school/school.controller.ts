import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { SchoolService } from './school.service';
import { School } from '@/entities';

@Controller('schools')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Get()
    async get(): Promise<School[]> {
        return await this.schoolService.get();
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<School> {
        return await this.schoolService.getOne(id);
    }

    @Post()
    async post(@Body() school: Partial<School>): Promise<School> {
        return await this.schoolService.post(school);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() school: Partial<School>): Promise<UpdateResult> {
        return await this.schoolService.update(id, school);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<UpdateResult> {
        return await this.schoolService.delete(id);
    }
}

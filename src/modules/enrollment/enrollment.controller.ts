import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';

import { EnrollmentService } from './enrollment.service';
import { Section, Enrollment, Person } from '@/entities';

@Controller('enrollment')
export class SectionController {
    constructor(private readonly enrollmentService: EnrollmentService) {}

    @Post()
    async post(@Body() { person,  sections } : { person: Partial<Person>, sections: Partial<Section>[] } ): Promise<Enrollment> {
        return await this.enrollmentService.post(person, sections);
    }

    @Put(':id')
    async delete(@Param('id') id: number): Promise<UpdateResult> {
        return await this.enrollmentService.delete(id);
    }
}

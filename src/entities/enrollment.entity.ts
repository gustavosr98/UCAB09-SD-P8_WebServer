import { Column, Entity, ManyToOne, ManyToMany } from 'typeorm';

import { BaseEntity, Person, Section } from '@/entities';

export enum EnrollmentType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Enrollment extends BaseEntity {
  @ManyToOne((type) => Person, (person) => person.enrollments, {eager: true})
  person: Person;

  @ApiProperty({enum: EnrollmentType })
  @Column({
    type: 'enum',
    enum: EnrollmentType,
    default: EnrollmentType.STUDENT,
  })
  type: EnrollmentType;

  @ManyToMany(() => Section, (section) => section.enrollments, { onDelete: 'CASCADE' })
  sections: Section[];
}

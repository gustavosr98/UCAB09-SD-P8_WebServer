import { Column, Entity, ManyToOne, ManyToMany } from 'typeorm';

import { BaseEntity, Person, Section } from '@/entities';

export enum EnrollmentType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Entity()
export class Enrollment extends BaseEntity {
  @ManyToOne((type) => Person, (person) => person.enrollments)
  person: Person;

  @Column({
    type: 'enum',
    enum: EnrollmentType,
    default: EnrollmentType.STUDENT,
  })
  type: EnrollmentType;

  @ManyToMany(() => Section, { onDelete: 'CASCADE' })
  sections?: Section[];
}

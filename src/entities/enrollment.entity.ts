import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity, Person } from '@/entities';

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
}

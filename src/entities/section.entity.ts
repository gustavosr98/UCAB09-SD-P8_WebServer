import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { Entity as MyEntity, School, Enrollment } from '@/entities';

export enum SectionType {
  MANDATORY = 'mandatory',
  ELECTIVE = 'elective',
}

@Entity()
export class Section extends MyEntity {
  @ManyToOne((type) => School, (school) => school.sections)
  school: School;

  @ManyToMany(() => Enrollment)
  @JoinTable()
  enrollments: Enrollment[];

  @Column()
  uc: number;

  @Column()
  semester: number;

  @Column({
    type: 'enum',
    enum: SectionType,
    default: SectionType.MANDATORY,
  })
  type: SectionType;

  @Column()
  ht: number;

  @Column()
  hp: number;

  @Column()
  hl: number;
}

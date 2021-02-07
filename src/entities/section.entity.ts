import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { Entity as MyEntity, School, Enrollment } from '@/entities';

export enum SectionType {
  MANDATORY = 'mandatory',
  ELECTIVE = 'elective',
}

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Section extends MyEntity {
  @ManyToOne((type) => School, (school) => school.sections)
  school: School;

  @ManyToMany(() => Enrollment, (enrollment) => enrollment.sections,  { onDelete: 'CASCADE' })
  @JoinTable()
  enrollments: Enrollment[];

  @ApiProperty()
  @Column()
  uc: number;

  @ApiProperty()
  @Column()
  semester: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: SectionType,
    default: SectionType.MANDATORY,
  })
  type: SectionType;

  @ApiProperty()
  @Column()
  ht: number;

  @ApiProperty()
  @Column()
  hp: number;

  @ApiProperty()
  @Column()
  hl: number;
}

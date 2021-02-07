import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity, Enrollment } from '@/entities';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Person extends BaseEntity {
  @OneToMany((type) => Enrollment, (enrollment) => enrollment.person)
  enrollments: Enrollment[];

  @ApiProperty()
  @Column()
  dni: string;

  @ApiProperty()
  @Column()
  first_name: string;

  @ApiProperty()
  @Column()
  last_name: string;
}

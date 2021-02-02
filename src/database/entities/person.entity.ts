import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity, Enrollment } from '@/database/entities';

@Entity()
export class Person extends BaseEntity {
  @OneToMany((type) => Enrollment, (enrollment) => enrollment.person)
  enrollments: Enrollment[];

  @Column()
  dni: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;
}

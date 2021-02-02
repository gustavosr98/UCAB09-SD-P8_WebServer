import { Entity, ManyToOne, OneToMany } from 'typeorm';

import { Entity as MyEntity, Faculty, Section } from '@/entities';

@Entity()
export class School extends MyEntity {
  @ManyToOne((type) => Faculty, (faculty) => faculty.schools)
  faculty: Faculty;

  @OneToMany((type) => Section, (section) => section.school)
  sections: Section[];
}

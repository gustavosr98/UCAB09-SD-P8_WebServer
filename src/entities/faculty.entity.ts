import { Entity, OneToMany } from 'typeorm';

import { Entity as MyEntity, School } from '@/entities';

@Entity()
export class Faculty extends MyEntity {
  @OneToMany((type) => School, (school) => school.faculty)
  schools: School[];
}

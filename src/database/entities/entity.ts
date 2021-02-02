import { Column } from 'typeorm';

import { BaseEntity } from '@/database/entities';

export class Entity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}

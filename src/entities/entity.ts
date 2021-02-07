import { Column } from 'typeorm';

import { BaseEntity } from '@/entities';

import { ApiProperty } from '@nestjs/swagger';

export class Entity extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;
}

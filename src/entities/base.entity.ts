import { Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Transform } from 'class-transformer';

export enum Status {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ENABLED,
  })
  status: Status;

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).toISOString())
  created_date: string;

  @DeleteDateColumn()
  @Transform(({ value }) => new Date(value).toISOString())
  deleted_date?: string;
}

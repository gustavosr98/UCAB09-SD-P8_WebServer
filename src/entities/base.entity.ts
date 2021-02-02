import { Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

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
  created_date: string;

  @DeleteDateColumn()
  deleted_date?: string;
}

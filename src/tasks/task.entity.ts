import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity() // indicate a database entity
export class Task {
  @PrimaryGeneratedColumn('uuid') // TypeORM automatically generate id as primary column (PK)
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}

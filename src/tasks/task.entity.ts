import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  // many tasks are assigned to one user
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}

import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // similar to collection navigation property
  @OneToMany((_type) => Task, (task) => task.user, { eager: true }) // eager: fetch a user will fetch all its tasks
  tasks: Task[];
}

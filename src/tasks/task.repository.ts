import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

// use Task entity as generic type in Repository
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {}

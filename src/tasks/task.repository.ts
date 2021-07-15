import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

// use Task entity as generic type in Repository
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    // create object, "this" is the instance of TasksRepository (DI)
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    // save to db
    await this.save(task);
    return task;
  }
}

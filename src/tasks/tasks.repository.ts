import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

// use Task entity as generic type in Repository
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    // TypeORM query builder method, from base class "Repository"
    const query = this.createQueryBuilder('task');

    // only fetch the tasks of current user
    query.where({ user });

    if (status) {
      // :status can be anything, need to match the key in 2nd arg ('status')
      // .andWhere is the "AND WHERE" in SQL
      query.andWhere('task.status = :status', { status }); // WHERE status='OPEN'
    }

    if (search) {
      // LOWER() makes sure the search is case-insensitive
      // need to wrap following statement inside "()", to separate from previous WHERE
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
      // WHERE task.title LIKE '%cook%' OR task.description LIKE '%cook%'
    }

    // use the modified query to get tasks
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    // create object, "this" is the instance of TasksRepository (DI)
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user, // make the new task owned by current user, TypeORM will auto add userId as FK
    });
    // save to db
    await this.save(task);
    return task;
  }
}

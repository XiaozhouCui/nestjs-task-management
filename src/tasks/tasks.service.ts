import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

// @Injectable() is used to define that a certain class should have a shared instance across the module. The instance can then be injected using Dependency Injection, and all injectors will have access to the same instance and its state.
@Injectable()
export class TasksService {
  constructor(
    // inject and initialize task repository
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTaasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    // try to get the task from database, db operations are async
    const found = await this.tasksRepository.findOne(id);
    // if not found, throw an error 404
    if (!found) {
      // the thrown error will bubble up and be handled in the internals of nestjs, auto mapped to 404
      throw new NotFoundException(`Tasks with ID "${id}" not found`);
    }
    // otherwise, return the found task (resolved promise)
    return found;
  }

  // service to create a task
  createTasks(createTaskDto: CreateTaskDto): Promise<Task> {
    // the create-task logic is moved into repository, easy to test
    return this.tasksRepository.createTask(createTaskDto); // returns a promise
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id); // auto handle non-exist id (404)
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    // console.log(result); // DeleteResult { raw: [], affected: 1 }
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }
}

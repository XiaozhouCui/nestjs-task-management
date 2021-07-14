import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// @Injectable() is used to define that a certain class should have a shared instance across the module. The instance can then be injected using Dependency Injection, and all injectors will have access to the same instance and its state.
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // methods are public by default
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasks = this.getAllTasks();

    // filter by status
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    // filter by key-word in title and description
    if (search) {
      tasks = tasks.filter((t) => {
        if (t.title.includes(search) || t.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  // service to create a task
  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}

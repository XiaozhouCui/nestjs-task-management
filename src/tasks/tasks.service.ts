import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // methods are public by default
  getAllTasks(): Task[] {
    return this.tasks;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  // methods are public by default
  getAllTasks() {
    return this.tasks;
  }
}

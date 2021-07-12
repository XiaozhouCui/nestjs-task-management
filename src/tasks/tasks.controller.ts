import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

// @Controller decorator specifies a controller
@Controller('tasks')
export class TasksController {
  // inject TasksService into TasksController, and initialise it as a private property
  constructor(private tasksService: TasksService) {}

  @Get() // handle GET requests sent to /tasks
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
}

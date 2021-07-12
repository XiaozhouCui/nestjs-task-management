import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  // @Body: nestjs will look for 'title' and 'description' in req body
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTasks(title, description);
  }
}

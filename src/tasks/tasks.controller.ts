import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
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
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: CreateTaskDto, // nestjs will look for DTO perperties (title and description) in req body
  ): Task {
    return this.tasksService.createTasks(createTaskDto);
  }
}

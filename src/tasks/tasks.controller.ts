import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

// @Controller decorator specifies a controller
@Controller('tasks') // arg 'tasks' is the path/route that the controller handles (/tasks)
export class TasksController {
  // inject TasksService into TasksController, and initialise it as a private property
  constructor(private tasksService: TasksService) {}

  // // http://localhost:3000/tasks?status=OPEN&search=room
  // @Get()
  // // DTO defines the shape of data of an incoming request, DTO is re-usable
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   // if we have any filters defined (query parameters), call tasksService.getTasksWithFilters
  //   if (Object.keys(filterDto).length)
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   // if no filters, just get all tasks
  //   return this.tasksService.getAllTasks();
  // }

  // http://localhost:3000/tasks/:id
  @Get('/:id')
  // @Param('id') will extract path parameter ":id"
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: CreateTaskDto, // nestjs will look for DTO perperties (title and description) in req body
  ): Promise<Task> {
    return this.tasksService.createTasks(createTaskDto);
  }

  // // update only the status
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto, // enum validation happens here
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id')
  // delete will return void
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}

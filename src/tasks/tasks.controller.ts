import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

// @Controller decorator specifies a controller
@Controller('tasks') // arg 'tasks' is the path/route that the controller handles (/tasks)
@UseGuards(AuthGuard()) // protect all task routes with AuthGuard from passport
export class TasksController {
  // initialise logger as a class member with a context 'TasksController', to identify where the log comes from
  private logger = new Logger('TasksController');
  // inject TasksService into TasksController, and initialise it as a private property
  constructor(private tasksService: TasksService) {}

  // http://localhost:3000/tasks?status=OPEN&search=room
  @Get()
  getTasks(
    // DTO defines the shape of data of an incoming request, DTO is re-usable
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User, // custom decorator @GetUser: get user from request
  ): Promise<Task[]> {
    // verbose level logging
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTaasks(filterDto, user);
  }

  // http://localhost:3000/tasks/:id
  @Get('/:id')
  // @Param('id') will extract path parameter ":id"
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    @Body() createTaskDto: CreateTaskDto, // nestjs will look for DTO perperties (title and description) in req body
    @GetUser() user: User, // custom decorator @GetUser: get user from request
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDto,
      )}`,
    );
    return this.tasksService.createTasks(createTaskDto, user);
  }

  // update only the status
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto, // enum validation happens here
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  // delete will return void
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}

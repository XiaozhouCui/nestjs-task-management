import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// @Module decorator specifies a module
@Module({
  controllers: [TasksController],
  providers: [TasksService], // allows services to be injected into controllers
})
export class TasksModule {}

import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

// @Module decorator specifies a module
@Module({
  controllers: [TasksController],
})
export class TasksModule {}

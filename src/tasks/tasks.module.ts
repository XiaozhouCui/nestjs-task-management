import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// @Module decorator specifies a module
@Module({
  // wire up TasksRepository to be injected anywhere in the module
  imports: [TypeOrmModule.forFeature([TasksRepository])], // forFeature() in tasks.module, as compared to forRoot() in app.module
  controllers: [TasksController],
  providers: [TasksService], // allows services to be injected into controllers
})
export class TasksModule {}

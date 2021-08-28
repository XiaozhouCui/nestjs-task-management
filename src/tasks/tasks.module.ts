import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// @Module decorator specifies a module
@Module({
  // wire up TasksRepository to be injected anywhere in the module
  imports: [
    ConfigModule, // this will expose config service, which can be injected
    TypeOrmModule.forFeature([TasksRepository]), // forFeature() in tasks.module, as compared to forRoot() in app.module
    AuthModule, // allow tasks module to apply JwtStrategy and PassportModule (inject user from db into req)
  ],
  controllers: [TasksController],
  providers: [TasksService], // allows services to be injected into controllers
})
export class TasksModule {}

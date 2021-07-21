import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ONE environment file per STAGE, env variables are prepended in npm scripts (packge.json)
      envFilePath: [`.env.stage.${process.env.NODE_ENV}`],
    }),
    TasksModule,
    // setup db connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, // search and load task.entity.ts
      synchronize: true, // keep db schema in sync, no migrations
    }),
    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    // first need to import ConfigModule, then will be used asyncly by another imported class "TypeOrmModule"
    ConfigModule.forRoot({
      // ONE environment file per STAGE, env variables are prepended in npm scripts (packge.json)
      envFilePath: [`.env.stage.${process.env.NODE_ENV}`],
      // add validation for environment variables (e.g. DB_USERNAME)
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    // setup db connection asynchronously, wait for ConfigModule to load env variables
    // Here is how to apply DI in a module file, not in a class
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // need ConfigModule to expose ConfigService
      inject: [ConfigService], // inject ConfigService to the asycn useFactory
      // the returned object of useFactory will be the configuration of this module, DI available for ConfigService
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true, // search and load task.entity.ts
          synchronize: true, // keep db schema in sync, no migrations
          host: configService.get('DB_HOST'), // access env variables
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}

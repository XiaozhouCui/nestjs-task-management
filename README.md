## Project setup

- Install nest CLI `npm i -g @nestjs/cli`
- Create project with nest CLI `nest new nestjs-task-management`

## Create tasks module

- Run `nest g module tasks`
- This will generate _/tasks/tasks.module.ts_, and update _app.module.ts_ to include `TasksModule`

## Create tasks controller

- Run `nest g controller tasks --no-spec`
- With flag `--no-spec`, no test files will be generated
- This will generate _/tasks/tasks.controller.ts_, and update _tasks.module.ts_ to add `TasksController` to controllers

## Create tasks service

- Run `nest g service tasks --no-spec`
- This will generate _/tasks/tasks.service.ts_, and update _tasks.module.ts_ to add `TasksService` to service providers
- Now `TasksService` can be injected into the constructor of `TasksController`, and initialised as a private property
- Implement CRUD operations in service and handle them in controller

## Add pipeline and decorators for validation

- Install packages `yarn add class-validator class-transformer`
- Wire up `ValidationPipe` in _main.ts_
- Add validation decorator to DTO properties, failed validation will result in 400 response
- Add `throw new NotFoundException()` in service getTaskById() will auto handled by nestjs and auto return 404
- Add enum validation to the TaskStatus enum
- Add decorators to filter and search in filterDTO, to validate query string parameters

## Setup Docker, pgAdmin and PostgreSQL

- Install **Docker** and **pgAdmin**
- Start docker container _postgres-nest_ from image _postgres_ on port _5432_, with environment variable _POSTGRES_PASSWORD_
- In CLI run: `docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres`
- In pgAdmin, first need to create a server, use _localhost:5432_ for connection, use container env _POSTGRES_PASSWORD_ (postgres) as password
- In pgAdmin, right click database icon and create a new database named _task-management_

## Setup TypeORM

- Install packages: `yarn add typeorm @nestjs/typeorm pg`, **pg** is the official driver of postgres
- In _app.module.ts_, import `TypeOrmModule` and setup db connection.
- Create _task.entity.ts_ and _task.repository.ts_ with TypeORM decorators
- In _tasks.module.ts_, import `TasksRepository` so that it can be injected anywhere in the module.
- Refactor the services and controllers to use TypeORM
- Move the create-task logic from service into repository
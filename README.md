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
- Refactor the remaining CRUD operations with TypeORM and repositories

## Scafold auth module

- Run `nest g module auth` to generate a new auth module, this will create *auth.module.ts* and update *app.module.ts*
- Run `nest g service auth --no-spec` to generate auth service, this will create *auth.service.ts* and update *auth.module.ts*
- Run `nest g controller auth --no-spec` to generate auth controller, this will create *auth.controller.ts* and update *auth.module.ts*
- Start the app and make sure everything works

## Sign up
- Add `AuthCredentialsDto` to handle username and password
- Add *user.repository.ts* and `createUser()` method to generate a new record in users table in database
- Install `bcrypt` (not bcryptjs) to hash the password before saving new user to db.
- Update auth service and auth controller to make the `/auth/signup` endpoint work.

## Sign in
- In auth service (not repository), add a method `signIn()`
- Call the `.findOne()` method of the injected user repository, to get the user data from db
- Use `bcrypt` to compare the submitted password against the hashed password in db.
- Update auth controller to make the `auth/signin` endpoint work.

## Add JWT authentication
- Install 5 packages `yarn add @nestjs/jwt @nestjs/passport passport passport-jwt @types/passport-jwt`
- Add passport and JWT (with options) in auth module `imports` array, it will export a JwtService to sign tokens
- Once imported, use DI to inject `JwtService` into auth service, use `this.jwtService.sign(payload)` to sign tokens
- Create *jwt.stragegy.ts*, use **passport** to prepare an auth mechanism
- **passport** is going to inject the user into the request object of our controller (similar to auth middleware in express?).

## Task Ownership and Restrictions
- Setup 1-to-many relationship in User entity, setup many-to-1 relationship in Task entity
- Use custom decorator `@GetUser` in tasks controller to get user from request and save user as a property of new task.
- Add and wire up global interceptor to serialize and exclude sensitive user data

## Logging
- Logger class is included in @nestjs/common
- To use logger in each class, need to instanciate Logger class with context (arg)
- Logger has different levels, such as `log`, `verbose` and `error`

## Environment variables
- On Windows, need to install win-node-env globally `npm install -g win-node-env`
- With win-node-env, we can prepend `NODE_ENV=dev` infront of `nest start --watch` in *package.json*
- Install config for nestjs `yarn add @nestjs/config`
- In *app.module.ts*, add ConfigModule into `imports`, and set path for env files *.env.stage.dev* and *.env.stage.prod*
- In *tasks.module.ts* import ConfigModule, which will expose an injectable service `ConfigService`
- In task controller, inject and initialise `ConfigService`, use the configService instance to access environment variable in .env files
- To connect to DB using environment variables, need to setup `TypeOrmModule.forRootAsync` and **DI** in *app.module.ts* file
- To validate config schema (environment variables), need to add JOI, `yarn add joi`, `yarn add -D @types/hapi__joi`
- Add Joi validation in *config.schema.ts*, pass it into `ConfigModule.forRoot()` in app module, now we can detect environment variable issues in console.
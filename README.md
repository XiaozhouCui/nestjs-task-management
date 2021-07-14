## Project setup
- Install nest CLI `npm i -g @nestjs/cli`
- Create project with nest CLI `nest new nestjs-task-management`

## Create tasks module
- Run `nest g module tasks`
- This will generate */tasks/tasks.module.ts*, and update *app.module.ts* to include `TasksModule` 

## Create tasks controller
- Run `nest g controller tasks --no-spec`
- With flag `--no-spec`, no test files will be generated
- This will generate */tasks/tasks.controller.ts*, and update *tasks.module.ts* to add `TasksController` to controllers 

## Create tasks service
- Run `nest g service tasks --no-spec`
- This will generate */tasks/tasks.service.ts*, and update *tasks.module.ts* to add `TasksService` to service providers
- Now `TasksService` can be injected into the constructor of `TasksController`, and initialised as a private property
- Implement CRUD operations in service and handle them in controller

## Add pipeline for validation
- Install packages `yarn add class-validator class-transformer`
- Wire up `ValidationPipe` in *main.ts*
- Add validation decorator to DTO properties, failed validation will result in 400 response
- Add `throw new NotFoundException()` in service getTaskById() will auto handled by nestjs and auto return 404 
- Add enum validation to the TaskStatus enum
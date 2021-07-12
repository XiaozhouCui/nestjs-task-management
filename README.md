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
- Now `TasksService` can be injected into `TasksController`'s constructor, and initialised as a private property
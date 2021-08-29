import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

// mock TasksRepository dependency, to be used as factory function
const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'Joe',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

// use "@nestjs/testing" for tests: interact with modules and providers in nestjs eco-system

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  // simulate a module that contains service and repository
  beforeEach(async () => {
    // initialize a nestjs module with tasksService and tasksRepository
    // don't interact with database (don't use TypeORM)
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile(); // need to compile the module before using it

    // module.get(): get a provider from a module
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  // test the "getTasks" method
  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      // .getTasks() returns a promise, need .mockResolvedValue()
      tasksRepository.getTasks.mockResolvedValue('someValue');
      // call tasksService.getTasks, which should then call the repository's getTasks
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});

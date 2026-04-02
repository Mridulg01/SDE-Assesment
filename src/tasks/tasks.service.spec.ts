import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

const mockTasksRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks for a given user', async () => {
      const mockUser = new User();
      mockUser.id = 'user1';
      const mockTask = new Task();
      mockTasksRepository.find.mockResolvedValue([mockTask]);

      const result = await service.findAll(mockUser);
      expect(result).toEqual([mockTask]);
      expect(mockTasksRepository.find).toHaveBeenCalledWith({ where: { user: { id: mockUser.id } } });
    });
  });
});

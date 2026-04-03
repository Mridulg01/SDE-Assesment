import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InternalServerErrorException } from '@nestjs/common';

const mockUser = new User();
mockUser.id = 'user-uuid';
mockUser.username = 'testuser';

describe('TasksService', () => {
  let service: TasksService;
  let repository;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(getRepositoryToken(Task));
  });

  describe('findAll', () => {
    it('should return paginated tasks and total count', async () => {
      const mockTasks = [new Task(), new Task()];
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockTasks, 2]);

      const filterDto: GetTasksFilterDto = { limit: 10, offset: 0 };
      const result = await service.findAll(filterDto, mockUser);

      expect(result).toEqual({ data: mockTasks, total: 2 });
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('task');
      expect(mockQueryBuilder.where).toHaveBeenCalled();
    });

    it('should apply status filter when provided', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([[], 0]);
      const filterDto: GetTasksFilterDto = { status: TaskStatus.OPEN };
      
      await service.findAll(filterDto, mockUser);
      
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'task.status = :status',
        { status: TaskStatus.OPEN }
      );
    });

    it('should throw InternalServerErrorException on database error', async () => {
      mockQueryBuilder.getManyAndCount.mockRejectedValue(new Error('DB Error'));
      const filterDto: GetTasksFilterDto = {};
      
      await expect(service.findAll(filterDto, mockUser)).rejects.toThrow(InternalServerErrorException);
    });
  });
});

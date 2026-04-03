import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService', { timestamp: true });

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(filterDto: GetTasksFilterDto, user: User): Promise<{ data: Task[]; total: number }> {
    const { status, search, limit = 10, offset = 0 } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    // Ensure users only see their own tasks
    query.where({ user: { id: user.id } });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const [tasks, total] = await query
        .orderBy('task.createdAt', 'DESC')
        .take(limit)
        .skip(offset)
        .getManyAndCount();

      return { data: tasks, total };
    } catch (error) {
      this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user: { id: user.id } } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.findOne(id, user);
    const { title, description, status, isCompleted } = updateTaskDto;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    return this.tasksRepository.save(task);
  }

  async remove(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user: { id: user.id } });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

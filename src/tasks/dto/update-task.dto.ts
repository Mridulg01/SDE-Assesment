import { PartialType } from '@nestjs/swagger'; // Use swagger for partial type to keep decorators
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'The current status of the task',
    example: TaskStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Whether the task is marked as completed',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}

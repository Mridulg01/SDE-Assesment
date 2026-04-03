import { IsEnum, IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum';
import { Type } from 'class-transformer';

export class GetTasksFilterDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Filter tasks by status (OPEN, IN_PROGRESS, DONE)',
    example: TaskStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Search tasks by title or description',
    example: 'refactor',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Number of results to skip (pagination)',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({
    description: 'Maximum number of results to return (pagination)',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}

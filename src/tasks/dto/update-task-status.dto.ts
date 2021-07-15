import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  // validate the status value is one of the enums
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

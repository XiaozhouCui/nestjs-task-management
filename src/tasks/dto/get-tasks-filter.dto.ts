import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status?: TaskStatus; // filters are optional
  search?: string;
}

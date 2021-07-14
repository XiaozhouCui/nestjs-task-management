import { IsNotEmpty } from 'class-validator';
// DTO is single source of truth, only change in one place
// DTO is good for validation
export class CreateTaskDto {
  // IsNotEmpty decorator is used for validation
  @IsNotEmpty() // failed validation will result in 400 error
  title: string;

  @IsNotEmpty()
  description: string;
}

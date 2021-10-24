import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;
}

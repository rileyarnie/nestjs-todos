import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
}

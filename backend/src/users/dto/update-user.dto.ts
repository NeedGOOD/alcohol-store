import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  first_name?: string | undefined;

  @IsString()
  @IsOptional()
  last_name?: string | undefined;

  @IsEmail()
  @IsOptional()
  email?: string | undefined;
}

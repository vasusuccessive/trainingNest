import { IsDefined, IsString, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(6, 20)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
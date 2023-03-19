import { IsEmail, IsString, Length, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string

  @IsEmail()
  email: string;

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

export class JwtPayloadDto {
  email: string;
}
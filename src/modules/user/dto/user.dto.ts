import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string

  @ApiProperty()
  @IsDefined()
  @IsString()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  password: string;
}

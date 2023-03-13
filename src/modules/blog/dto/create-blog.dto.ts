import { IsDefined, IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class NestedObject {
  @ApiProperty()
  @IsDefined()
  @IsString()
  by: string;
  
  @ApiProperty()
  @IsDefined()
  @IsString()
  timestamp: string;
}

export class BlogDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedObject)
  comment: string;

}

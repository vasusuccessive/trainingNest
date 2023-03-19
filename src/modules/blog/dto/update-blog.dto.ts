import { IsString, IsOptional, IsArray } from 'class-validator';


export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  comments: { text: string; author: string }[];

  @IsOptional()
  @IsString()
  likes: string;

  @IsOptional()
  @IsString()
  by: string

}
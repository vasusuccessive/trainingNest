import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SystemResponse } from '../../libs/response-handler';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/create-blog.dto';
import { Request, Response } from 'express';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() blogDto: BlogDto,
  ) {
    const { logger } = res.locals;
    try {
      const added = await this.blogService.create(blogDto);
      logger.info({
        message: 'Blog task is added successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('Blog task is added successfully!', added),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.blogService.findAll(page, limit);
      logger.info({
        message: 'All blog fetched successfully',
        data: [],
        option: [],
      });

      return res.send(
        SystemResponse.success('Blog fetched successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const singleBlog = await this.blogService.findOne(id);
      logger.info({
        message: 'Single task fetched successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('single task fetched successfully', singleBlog),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.blogService.remove(id);
      logger.info({
        message: 'Task deleted successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('Task deleted successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }
}

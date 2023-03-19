import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SystemResponse } from '../../libs/response-handler';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Request, Response } from 'express';

@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.userService.findAll(page, limit);
      logger.info({
        message: 'User list fetched successfully',
        data: [],
        option: [],
      });

      return res.send(
        SystemResponse.success('User list fetched successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Get(':email')
  async findOne(
    @Param('email') email: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const singleUser = await this.userService.findOne(email);
      logger.info({
        message: 'Single task fetched successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('single task fetched successfully', singleUser),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

}

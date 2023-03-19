import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async create(userDto: UserDto, Hashpassword: string, res: any): Promise<User> {
    const { email, name } = userDto;
    const single = await this.userModel.find({email: email});
    if(single.length !== 0) {
      throw new Error('User is already exist!')
    }else {
      const createdUser = new this.userModel({ email, password: Hashpassword, name });
      return createdUser.save();;
    }
  }

  async findAll(page?: number, limit?: number): Promise<User[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.userModel.find().limit(limit).skip(skip);
    if (!list || list.length === 0) {
      throw new NotFoundException('Could not find user');
    }
    return list;
  }

  async findOne(email: string): Promise<User[]> {
    const single = await this.userModel.find({email});
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}

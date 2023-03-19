import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schema/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: mongoose.Model<Blog>,
  ) {}

  async create(blogDto: BlogDto): Promise<Blog> {
    return await this.blogModel.create({
      ...blogDto,
    });
  }

  async findAll(page?: number, limit?: number): Promise<Blog[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.blogModel.find().limit(limit).skip(skip);
    if (!list || list.length === 0) {
      throw new NotFoundException('Could not find blog Model');
    }
    return list;
  }

  async findOne(id: string): Promise<Blog> {
    const single = await this.blogModel.findById(id);
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }


  async remove(id: string): Promise<Blog> {
    return this.blogModel.findByIdAndDelete(id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const editedTodo = await this.blogModel.findById(id);
    if (updateBlogDto.comments) {
      editedTodo.comments = updateBlogDto.comments;
    }
    if (updateBlogDto.likes) {
      editedTodo.likes = updateBlogDto.likes;
    }
    const newData = {
      ...editedTodo,
      comments: editedTodo.comments,
      likes: editedTodo.likes,
    };
    await this.blogModel.findByIdAndUpdate(id, newData);
    return await this.blogModel.findById(id);
  }
}

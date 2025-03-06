import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(data: any) {
    const newPost = await this.postModel.create(data);
    return {
      status: 201,
      message: 'Post created successfully',
      data: newPost,
    };
  }

  async findAll() {
    const posts = await this.postModel.find();
    return {
      status: 200,
      message: 'Posts retrieved successfully',
      data: posts,
    };
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return {
      status: 200,
      message: 'Post retrieved successfully',
      data: post,
    };
  }

  async update(id: string, data: any) {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPost) throw new NotFoundException('Post not found');
    return {
      status: 200,
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  async remove(id: string) {
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost) throw new NotFoundException('Post not found');
    return {
      status: 200,
      message: 'Post deleted successfully',
      data: deletedPost,
    };
  }
}

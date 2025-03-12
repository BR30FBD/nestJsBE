import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../post.schema';
import { PostsService } from '../posts.service';

const mockPost = {
  title: 'Test Post',
  content: 'This is a test post.',
};

describe('PostService', () => {
  let service: PostsService;
  let model: Model<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockPost),
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    model = module.get<Model<Post>>(getModelToken(Post.name));
  });

  it('should create a post', async () => {
    const post = await service.create({ title: 'Test Post', content: 'This is a test post.' });
    expect(post).toEqual(mockPost);
  });
});

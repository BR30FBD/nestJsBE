import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (POST) - should create a post', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .send({ title: 'E2E Test Post', content: 'This is an E2E test post.' })
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBe('E2E Test Post');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

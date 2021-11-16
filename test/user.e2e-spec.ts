import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserModule } from './../src/user/user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/id/779768457403170857')
      .expect(200)
      .expect({
        id: 1,
        name: 'Thinh',
        age: 15,
        sex: true,
      });
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/id/0').expect(404);
  });
});

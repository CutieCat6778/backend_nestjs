import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { connection } from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/id/852929737529884692')
      .expect(200)
      .expect({ id: '852929737529884692', total: 30, exp: 169, level: 0 });
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/id/0').expect(404);
  });

  afterAll((done) => {
    console.log('close');
    connection.close();
    app.close();
    done();
    setTimeout(() => process.exit(), 1000);
  });
});

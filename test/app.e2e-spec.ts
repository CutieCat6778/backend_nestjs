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
      .get('/user/762749432658788384')
      .expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/something').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/abc').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/0').expect(404);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/something').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/id/abc').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/day/16').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/channels/days/15,16,17')
      .expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/day/abc').expect(406);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/id/0').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages/16/12').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages/16').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages/abc').expect(406);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages/9').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages/16/12/2021').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/messages/week').expect(200);
  });

  afterAll((done) => {
    console.log('close');
    connection.close();
    app.close();
    done();
    setTimeout(() => process.exit(), 1000);
  });
});

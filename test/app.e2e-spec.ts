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
      .expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/something').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/id/abc').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/day/20').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/days/19,20,21').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/day/abc').expect(406);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/id/0').expect(404);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/something').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/id/abc').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/day/20').expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/channels/days/19,20,21')
      .expect(200);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/day/abc').expect(406);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels').expect(404);
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/channels/id/0').expect(200);
  });

  afterAll((done) => {
    console.log('close');
    connection.close();
    app.close();
    done();
    setTimeout(() => process.exit(), 1000);
  });
});

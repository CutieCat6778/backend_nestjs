import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      controllers: [UserController],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('find user data', () => {
    const name = 'Thinh';
    const name2 = 'Katarina';

    it('should return an Object', () => {
      expect(service.findByName(name)).toMatchObject({
        name: 'Thinh',
        age: 15,
        sex: true,
      });
    });
    it('should return an null', () => {
      expect(service.findByName(name2)).toMatchObject({
        name: null,
        age: null,
        sex: null,
      });
    });
  });
});

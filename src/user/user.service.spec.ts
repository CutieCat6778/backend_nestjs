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
    const id = 1;
    const id2 = 0;

    it('should return an Object', () => {
      expect(service.findById(id)).toBeDefined();
    });
    it('should return an null', () => {
      expect(service.findById(id2)).toBe(undefined);
    });
  });
});

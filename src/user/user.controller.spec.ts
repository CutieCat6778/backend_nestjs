import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('findUserData', () => {
    const name = 'Thinh';
    const name2 = 'Katarina';

    it('should return an Object with user name Thinh, age 15 and sex true', () => {
      expect(controller.findUser(name)).toMatchObject({
        name: 'Thinh',
        age: 15,
        sex: true,
      });
    });
    it('should return null', () => {
      expect(controller.findUser(name2)).toMatchObject({
        name: null,
        age: null,
        sex: null,
      });
    });
  });
});

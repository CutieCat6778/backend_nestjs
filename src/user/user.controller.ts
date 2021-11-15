import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  findUser(@Param('name') name: string): User {
    const result = this.userService.findByName(name);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }
}

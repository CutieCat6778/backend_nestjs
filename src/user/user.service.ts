import { Injectable } from '@nestjs/common';
import user_data from '../../asset/user_data.json';
import { User } from './user.interface';

@Injectable()
export class UserService {
  findByName(name: string): User {
    const user: User = user_data.find((a) => a.name === name);
    return user ? user : undefined;
  }
}

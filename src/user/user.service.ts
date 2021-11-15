import { Injectable } from '@nestjs/common';
import user_data from '../../asset/user_data.json';
import { User } from './user.interface';

@Injectable()
export class UserService {
  findByName(name: string): User {
    const user: User = user_data.find((a) => a.name === name);
    const handler: User = { name: null, age: null, sex: null };
    return user ? user : handler;
  }
}

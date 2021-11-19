import { User } from 'src/interfaces/user.interface';
export interface UserRes {
  data: User;
  time: number;
}

export interface UsersRes {
  data: User[];
  time: number;
}

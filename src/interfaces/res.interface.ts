import { User } from 'src/interfaces/user.interface';
export interface UserRes {
  data: User;
  time: number;
}

export interface UsersRes {
  data: User[];
  time: number;
}
interface Channel {
  id: string;
  times: string[];
}

export interface ChannelsRes {
  data: Channel[];
  time: number;
}

export interface ChannelRes {
  data: string[];
  time: number;
}

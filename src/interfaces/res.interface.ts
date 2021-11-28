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

export interface UserAPIRes {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  system: boolean;
  mfa_enabled: boolean;
  banner: string;
  accent_color: number;
  locale: number;
  flags: number;
  premium_type: number;
  publig_flags: number;
  verified: boolean;
}

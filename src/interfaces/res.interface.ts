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
  times: Date[];
  id: string;
  name: string;
  createdAt: string;
  parent?: string;
  position: number;
  description?: string;
  type: string;
}

export interface ChannelsRes {
  data: Channel[];
  time: number;
}

export interface ChannelRes {
  data: Channel;
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

interface Voice {
  total: number;
  date: string;
}

interface UserVoice {
  voices: Voice[];
  userData: UserAPIRes;
}

export interface VoiceRes {
  date: UserVoice;
  time: number;
}

export interface VoicesRes {
  data: UserVoice[];
  time: number;
}

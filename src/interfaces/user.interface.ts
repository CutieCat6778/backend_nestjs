import { UserAPIRes } from './res.interface';

interface Mentions {
  _id: string;
  times: Date[];
}

interface Messages {
  message: Date[];
  updated: Date[];
  deleted: Date[];
  links: Date[];
  bot: Date[];
  stickers: Date[];
  mentions: Mentions[];
}

interface Voice {
  date: string;
  total: number;
}

interface Server {
  leave: Date[];
  join: Date[];
  invites: Date[];
}

interface Channels {
  _id: string;
  times: Date[];
}
export interface User {
  id: string;
  details?: UserAPIRes;
  total: number;
  exp: number;
  level: number;
  messages: Messages;
  voice: Voice[];
  server: Server;
  channels: Channels[];
  updates: Date[];
}

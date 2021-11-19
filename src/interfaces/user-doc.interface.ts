import { Document } from 'mongoose';

interface Mentions {
  _id: string;
  times: string[];
}

interface Messages {
  message: string[];
  updated: string[];
  deleted: string[];
  links: string[];
  bot: string[];
  stickers: string[];
  mentions: Mentions[];
}

interface Voice {
  data: string;
  total: number;
}

interface Server {
  leave: string[];
  join: string[];
  invites: string[];
}

interface Channels {
  _id: string;
  times: string[];
}

export interface UserDoc extends Document {
  total: number;
  exp: number;
  level: number;
  messages: Messages;
  voice: Voice[];
  server: Server;
  channels: Channels[];
}

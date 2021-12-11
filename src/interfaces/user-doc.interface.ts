import { Document } from 'mongoose';

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
  data: string;
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

export interface UserDoc extends Document {
  total: number;
  exp: number;
  level: number;
  messages: Messages;
  voice: Voice[];
  server: Server;
  channels: Channels[];
  updates: Date[];
}

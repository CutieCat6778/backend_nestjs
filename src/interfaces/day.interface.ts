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

export interface Day {
  voice: Voice[];
  messages: Messages[];
  server: Server;
  channels: Channels[];
}

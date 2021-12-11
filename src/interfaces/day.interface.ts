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

export interface Day {
  voice: Voice[];
  messages: Messages[];
  server: Server;
  channels: Channels[];
}

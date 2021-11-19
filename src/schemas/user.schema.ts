import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  total: Number,
  exp: Number,
  level: Number,
  voice: [
    {
      data: Date,
      total: Number,
    },
  ],
  messages: {
    message: [Date],
    updated: [Date],
    deleted: [Date],
    links: [Date],
    bot: [Date],
    stickers: [Date],
    emojis: [Date],
    reactions: [Date],
    mentions: [
      {
        _id: String,
        times: [Date],
      },
    ],
    mentionsBy: [Date],
  },
  server: {
    leave: [Date],
    join: [Date],
    invites: [Date],
  },
  channels: [
    {
      _id: String,
      times: [Date],
    },
  ],
});

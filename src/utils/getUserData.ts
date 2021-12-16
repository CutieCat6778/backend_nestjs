import axios from 'axios';
import { UserAPIRes } from '../interfaces/res.interface';
import { resolveAvatar } from './resolveAvatar';

export async function getUserData(id: string): Promise<UserAPIRes> {
  const { data } = await axios.get('https://discord.com/api/v9/users/' + id, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bot ' + process.env.TOKEN,
    },
  });
  data.avatar = resolveAvatar(data.avatar, id);
  return data;
}

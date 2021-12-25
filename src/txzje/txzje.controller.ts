import {
  Controller,
  Get,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import axios from 'axios';
import { LoggingInterceptor } from '../logging.interceptor';

@Controller('txzje')
export class TxzjeController {
  @UseInterceptors(LoggingInterceptor)
  @Get('')
  async findUser(): Promise<any> {
    let result;
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer BQDlSbmizOlU16rjV_R7fDfLCz7eAEvJTGQOsrCM8HbsME2OEmH7xUv6UcdosFuw30QuWwVjycT_c4MoVhvjfG0ggIsRiV-vvGcDgLDxF4v01KZI82nTeiqT2kf6vl1I8Dd-jOn3vXtkYTGV4RCd8iitYk7oqygZVKk5ePtt"',
        },
      },
    );
    console.log(data.item.id);
    const id = data.item.id;
    if (id) {
      const res = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer BQDlSbmizOlU16rjV_R7fDfLCz7eAEvJTGQOsrCM8HbsME2OEmH7xUv6UcdosFuw30QuWwVjycT_c4MoVhvjfG0ggIsRiV-vvGcDgLDxF4v01KZI82nTeiqT2kf6vl1I8Dd-jOn3vXtkYTGV4RCd8iitYk7oqygZVKk5ePtt"',
        },
      });
      console.log(res.data);
      result = {
        name: res.data.name,
        image: res.data.album?.images[1]?.url
          ? res.data.album?.images[1]?.url
          : 'https://cutiecat6778.github.io/cdn/spotify.png',
      };
    }
    if (data) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }
}

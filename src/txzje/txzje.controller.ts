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
            'Bearer BQBPme6RK1Jde68jjZN_w5caiF1XLIxwHVYJpPqT_CEMuPQtI3UcB-qMplbCBSEAQybkZKr7NdwNOFi766ZAiCFHtM9ctHkdwuzan-FRnHHUkT944jX9Dk_VuGLbjaRG7fDvXbZ0OTxp2DHDUMaY3lHLtUYMTq4Aa76q5h3a',
        },
      },
    );
    const id = data.item.id;
    if (id) {
      const res = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer BQBPme6RK1Jde68jjZN_w5caiF1XLIxwHVYJpPqT_CEMuPQtI3UcB-qMplbCBSEAQybkZKr7NdwNOFi766ZAiCFHtM9ctHkdwuzan-FRnHHUkT944jX9Dk_VuGLbjaRG7fDvXbZ0OTxp2DHDUMaY3lHLtUYMTq4Aa76q5h3a',
        },
      });
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

import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Levels', schema: UserSchema }]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { VoicesController } from './voices.controller';
import { VoicesService } from './voices.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Levels', schema: UserSchema }]),
  ],
  controllers: [VoicesController],
  providers: [VoicesService],
})
export class VoicesModule {}

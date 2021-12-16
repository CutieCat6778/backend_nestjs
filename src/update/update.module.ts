import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UpdateController } from './update.controller';
import { UpdateService } from './update.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Levels', schema: UserSchema }]),
  ],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}

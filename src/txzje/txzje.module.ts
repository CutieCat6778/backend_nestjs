import { Module } from '@nestjs/common';
import { TxzjeController } from './txzje.controller';

@Module({
  controllers: [TxzjeController],
})
export class TxzjeModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { GraphqlModule } from './graphql.module';
import { MongoModule } from './mongo.module';

@Module({
  exports: [ConfigModule, GraphqlModule, MongoModule],
  imports: [ConfigModule, GraphqlModule, MongoModule],
})
export class CommonModule {}

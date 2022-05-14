import { Field, ObjectType } from '@nestjs/graphql';
import { UserSecure } from 'src/schemas/user.schema';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserSecure)
  user: UserSecure;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

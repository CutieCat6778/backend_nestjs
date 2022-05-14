import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field(() => String, { description: "User's username" })
  username: string;

  @Field(() => String, { description: "User's password" })
  password: string;

  @Field(() => String, { description: "User's email" })
  email: string;
}

@InputType()
export class AuthUser {
  @Field(() => String, { description: "User's username" })
  username: string;

  @Field(() => String, { description: "User's password" })
  password: string;
}

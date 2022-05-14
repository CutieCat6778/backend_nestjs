import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUser } from 'src/dto/userDto.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUser') createUser: CreateUser) {
    return this.userService.createUser(createUser);
  }

  @Query(() => [User], { name: 'findAll' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findUser' })
  findUser(
    @Args('username', { type: () => String }) username: string,
  ): Promise<User | Error> {
    return this.userService.findUser(username);
  }
}

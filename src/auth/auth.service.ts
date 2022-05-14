import { SignupUserInput } from './dto/signup.input';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Compare, Hash } from 'src/utils/hasher';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (user && Compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput): Promise<any> {
    const user = await this.userService.findUser(loginUserInput.username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return {
      access_token: this.jwtService.sign({
        username: user.username,
      }),
      user: user,
    };
  }

  async signup(signupUserInput: SignupUserInput): Promise<any> {
    const user = await this.userService.findUser(signupUserInput.username);
    if (user) throw new Error('User already existed!');

    const email = await this.userService.findEmail(signupUserInput.email);
    if (email) throw new Error('Email have been used!');

    const password = await Hash(signupUserInput.password);

    return this.userService.createUser({
      ...signupUserInput,
      password,
    });
  }
}

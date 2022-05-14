import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUser } from 'src/dto/userDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUser): Promise<User> {
    const user = new this.model(createUserDto);
    return user.save();
  }

  async findUser(name: string): Promise<User> {
    const user = await this.model.findOne({
      username: name,
    });
    try {
      if (!user) return null;
    } finally {
      return user;
    }
  }

  async findEmail(email: string): Promise<User> {
    const user = await this.model.findOne({
      email,
    });
    try {
      if (!user) return null;
    } finally {
      return user;
    }
  }

  async findAll(): Promise<User[]> {
    const users = this.model.find();
    return users;
  }
}

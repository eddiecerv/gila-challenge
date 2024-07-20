import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOne(email: string, password: string): Promise<UserDto | undefined> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return undefined;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    return isPasswordCorrect ? this.toUserDto(user) : null;
  }

  async findAll(): Promise<UserDto[] | undefined> {
    const users = await this.userModel.find().exec();

    if (!users) {
      return undefined;
    }

    const dtoUsers = users.map((user) => this.toUserDto(user));
    return dtoUsers || [];
  }

  async create(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  private toUserDto(user: UserDocument): UserDto {
    const { id, name, email, phone, subscribed, channels } = user;
    const userDto: UserDto = new UserDto(
      id,
      name,
      email,
      phone,
      subscribed,
      channels,
    );
    return userDto;
  }
}

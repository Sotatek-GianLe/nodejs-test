/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity/user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() user: User): Promise<User> {
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    return await this.userService.createUser(user);
  }
}

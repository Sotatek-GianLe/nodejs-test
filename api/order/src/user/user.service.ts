import { Injectable } from '@nestjs/common';
import { User } from './user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(user: User): Promise<any> {
    try {
      return this.userRepo.save(user);
    } catch (error) {
      return 'User is existed!';
    }
  }

  async getUser(username: string): Promise<User> {
    return this.userRepo.findOne({ where: { username } });
  }
}

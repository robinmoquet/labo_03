import { Injectable } from '@nestjs/common';
import { UserRepository } from './models/user.repository';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneByEmail(email: string, payload: object = {}): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email, payload);
  }

  async findById(id: number, payload: object = {}): Promise<User> {
    return await this.userRepository.findOne({id}, payload);
  }
}

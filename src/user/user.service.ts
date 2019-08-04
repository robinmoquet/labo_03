import { Injectable } from '@nestjs/common';
import { UserRepository } from './models/user.repository';
import { LoginUserDto } from './models/login-user.dto';
import { User } from './models/user.entity';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/security';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email);
  }
}

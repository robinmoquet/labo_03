import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.entity';
import { LoginUserDto } from '../user/models/login-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async validateUser(loginUser: LoginUserDto): Promise<User | null> {
    const user = await this.userService.findOneByEmail(loginUser.email);

    if (user && (await compare(loginUser.password, user.password))) {
      return user;
    }

    console.log(user);

    return null;
  }
}

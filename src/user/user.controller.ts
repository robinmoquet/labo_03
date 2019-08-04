import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './models/user.repository';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import { ResponseDto, Status } from '../response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  async createUser(@Body() user: User): Promise<ResponseDto<any>> {
    return {
      status: Status.success,
      data: await this.userRepository.createUser(user),
    };
  }
}

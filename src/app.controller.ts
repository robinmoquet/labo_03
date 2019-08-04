import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { ResponseDto, Status } from './response.dto';
import { User } from "./user/models/user.entity";
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<ResponseDto<{access_token: string}>> {
    return {
      status: Status.success,
      data: await this.authService.login(req.user)
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async profile(@Request() req): Promise<ResponseDto<User>> {
    return {
      status: Status.success,
      data: await this.userService.findOneByEmail(req.user.email)
    }
  }

}

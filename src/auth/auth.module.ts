import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {SECRET_KEY} from '../config/security';
import {UserRepository} from '../user/models/user.repository';

@Module({
  imports: [UserRepository, PassportModule, JwtModule.register({
    secret: SECRET_KEY,
    signOptions: {expiresIn: '1 years'},
  })],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

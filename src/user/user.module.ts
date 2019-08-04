import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './models/user.repository';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController],
    providers: [UserService],
    exports: [TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}

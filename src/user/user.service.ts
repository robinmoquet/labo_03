import { Injectable } from '@nestjs/common';
import {UserRepository} from './models/user.repository';
import {LoginUserDto} from './models/login-user.dto';
import {User} from './models/user.entity';
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {SECRET_KEY} from '../config/security';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async checkCredential(loginUserDto: LoginUserDto): Promise<User|boolean> {
        const user = await this.userRepository.findUserByEmail(loginUserDto.email);
        if (user === null) { return false; }
        if (!await compare(loginUserDto.password, user.password)) { return false; }
        return user;
    }

    generateJwt(user: User): string {
        return sign({id: user.id, email: user.email}, SECRET_KEY);
    }

}

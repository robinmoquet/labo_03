import {Injectable} from '@nestjs/common';
import {UserRepository} from '../user/models/user.repository';
import {User} from '../user/models/user.entity';
import {LoginUserDto} from '../user/models/login-user.dto';
import {compare} from 'bcrypt';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(loginUser: LoginUserDto): Promise<User|null> {
        const user = await this.userRepository.findUserByEmail(loginUser.email);

        if (user && await compare(user.password, loginUser.password)) {
            return user;
        }

        return null;
    }

    async login(user: User): Promise<{access_token: string}> {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}

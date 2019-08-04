import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';
import {hash} from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    /**
     * Le Retour est en any, car on ne veut pas
     * retourner le password.
     *
     * @param user
     */
    async createUser(user: User): Promise<any> {
        // generation de password
        user.password = await hash(user.password, 12);
        const resUser = await this.save(user);
        const { password, ...result } = resUser;
        return result;
    }

    async findUserByEmail(email: string): Promise<User|null> {
        const user = await this.findOne({email});
        return user === undefined ?  null : user;
    }
}

import { UserEntity } from '../entities/user.entity';

export interface IAuthRepository {
    login(input: UserEntity): Promise<any>;
}
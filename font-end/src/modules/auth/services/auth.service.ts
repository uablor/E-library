import { UserEntity } from './../entities/user.entity';
import { inject, injectable } from 'tsyringe';
import { LoginUseCase } from '../use-cases/login.use-case';

@injectable()
export class AuthService {
    constructor(
        @inject(LoginUseCase) private _login: LoginUseCase
    ) {

    }

    async login(input: UserEntity) {
        return await this._login.execute(input);
    }
}
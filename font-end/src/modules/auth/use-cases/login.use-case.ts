import type { IUseCase } from '@/common/interfaces/use-case.interface';
import { injectable, inject } from 'tsyringe';
import { AuthRepository } from '../repositories/auth.repository';
import { UserEntity } from '../entities/user.entity';
import type { IAuthRepository } from '../interfaces/auth.interface';


@injectable()
export class LoginUseCase implements IUseCase {
    constructor(
      @inject(AuthRepository) private _api: IAuthRepository
    ) {

    }

    async execute(input: UserEntity): Promise<any> {
        return await this._api.login(input);
    }
}



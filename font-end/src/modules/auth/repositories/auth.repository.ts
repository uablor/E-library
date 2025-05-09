import { AxiosApi } from '../../../common/configurations/axios.config';
import { injectable, inject } from 'tsyringe';
import { IResponse } from '@/common/interfaces/response.interface';
import { UserEntity } from '../entities/user.entity';
import { IAuthRepository } from '../interfaces/auth.interface';

@injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
        @inject(AxiosApi) private _api: AxiosApi
    ) {}

    async login(input: UserEntity): Promise<IResponse<UserEntity>> {
        const response = await this._api.axios({
                method: 'post',
                url: '/auth/login',
                params: {
                    email: input.email,
                    password: input.password
                },
            });

        return {
            data: response.data,
            message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ.',
            status: 'success'
        }
    }
}


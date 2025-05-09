import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import type { IUserRepository } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";

@injectable()
export class CreateUserUseCase implements IUseCase {
  constructor(@inject(UserRepository) private _api: IUserRepository) {}

  async execute(input: UserEntity): Promise<any> {
    return await this._api.create(input);
  }
}

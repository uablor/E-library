import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import type { IUserRepository } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

@injectable()
export class GetUserProfileUseCase implements IUseCase {
  constructor(@inject(UserRepository) private _api: IUserRepository) {}

  async execute(): Promise<any> {
    return await this._api.getUserProfile();
  }
}

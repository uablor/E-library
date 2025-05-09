import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import type { IUserRepository } from "../interfaces/user.interface";

@injectable()
export class GetAllUserUseCase
  implements
    IGUseCase<IResponse<IGPaginated<UserEntity>>, IGPaginate<UserEntity>>
{
  constructor(@inject(UserRepository) private _api: IUserRepository) {}

  async execute(
    input: IGPaginate<Pick<UserEntity, "name" | "role">>
  ): Promise<void | IResponse<IGPaginated<UserEntity>>> {
    try {
      return await this._api.getAll(input);
    } catch (error: any) {
      if (error.response.status === 422) {
        Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      }
    }
  }
}

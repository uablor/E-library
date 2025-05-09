import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import type { IUserRepository } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { UserEntity } from "../entities/user.entity";

@injectable()
export class DeleteUserUseCase implements IUseCase {
  constructor(@inject(UserRepository) private _api: IUserRepository) {}

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Deletes a user by ID.
   *
   * @param {UserEntity} id The ID of the user to delete.
   * @returns {Promise<any>} A promise that resolves or rejects based on the
   * outcome of the deletion. If the deletion is successful, the promise will
   * resolve to the deleted user entity. Otherwise, it will reject with an
   * appropriate error.
   */
/******  38fa0d15-8bf6-4e5d-81a4-37026586932c  *******/  async execute(id: UserEntity): Promise<any> {
    return await this._api.delete(id);
  }
}

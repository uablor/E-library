import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  create(input: UserEntity): Promise<any>;

  update(input: UserEntity): Promise<any>;

  delete(id: UserEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<UserEntity, "name" | "role">>
  ): Promise<IResponse<IGPaginated<UserEntity>>>;

  getOne(id: number): Promise<any>;

  getAllRoles(): Promise<any>;

  getAllPermissions(): Promise<any>;

  getUserProfile(): Promise<any>;

  updateProfile(input: UserEntity): Promise<any>;
}

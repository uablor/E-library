import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { PEntity } from "../entities/entity";

export interface IRepository {
  create(input: PEntity): Promise<any>;

  update(input: PEntity): Promise<any>;

  delete(id: PEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<PEntity, "policy_type">>
  ): Promise<IResponse<IGPaginated<PEntity>>>;

  getOne(id: PEntity): Promise<any>;
}

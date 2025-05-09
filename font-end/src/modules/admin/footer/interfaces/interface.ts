import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { FooterEntity } from "../entities/entity";

export interface IFooterRepository {
  create(input: FooterEntity): Promise<any>;

  update(input: FooterEntity): Promise<any>;

  delete(id: FooterEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<FooterEntity, "email">>
  ): Promise<IResponse<IGPaginated<FooterEntity>>>;

  getOne(id: FooterEntity): Promise<any>;
}

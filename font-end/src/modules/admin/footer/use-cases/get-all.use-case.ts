import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { FooterEntity } from "../entities/entity";
import { FooterRepository } from "../repositories/repository";
import type { IFooterRepository } from "../interfaces/interface";

@injectable()
export class GetAllUseCase
  implements
    IGUseCase<IResponse<IGPaginated<FooterEntity>>, IGPaginate<FooterEntity>>
{
  constructor(@inject(FooterRepository) private _api: IFooterRepository) {}

  async execute(
    input: IGPaginate<Pick<FooterEntity, "email">>
  ): Promise<void | IResponse<IGPaginated<FooterEntity>>> {
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

import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { PEntity } from "../entities/entity";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";

@injectable()
export class GetAllUseCase
  implements IGUseCase<IResponse<IGPaginated<PEntity>>, IGPaginate<PEntity>>
{
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(
    input: IGPaginate<Pick<PEntity, "title">>
  ): Promise<void | IResponse<IGPaginated<PEntity>>> {
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

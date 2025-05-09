import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";
import { HouseEntity } from "@/modules/realEstate/owner/house/entities/house.entity";

@injectable()
export class GetAllUseCase
  implements
    IGUseCase<IResponse<IGPaginated<HouseEntity>>, IGPaginate<HouseEntity>>
{
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(
    input: IGPaginate<
      Pick<
        HouseEntity,
        | "real_estate_type_id"
        | "service_model"
        | "room_type"
        | "search"
        | "district_id"
        | "province_id"
        | "country_id"
      >
    >
  ): Promise<void | IResponse<IGPaginated<HouseEntity>>> {
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

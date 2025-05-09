import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { RealEstateTypeEntity } from "../entities/real-estate-type.entity";
import { RealEstateTypeRepository } from "../repositories/real-estate-type.repository";
import type { IRealEstateTypeRepository } from "../interfaces/real-estate-type.interface";

@injectable()
export class GetAllRealEstateTypeUseCase
  implements
    IGUseCase<
      IResponse<IGPaginated<RealEstateTypeEntity>>,
      IGPaginate<RealEstateTypeEntity>
    >
{
  constructor(
    @inject(RealEstateTypeRepository) private _api: IRealEstateTypeRepository
  ) {}

  async execute(
    input: IGPaginate<Pick<RealEstateTypeEntity, "name">>
  ): Promise<void | IResponse<IGPaginated<RealEstateTypeEntity>>> {
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

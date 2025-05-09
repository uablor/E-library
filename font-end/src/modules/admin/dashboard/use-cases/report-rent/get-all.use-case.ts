import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { HouseEntity } from "@/modules/realEstate/owner/house/entities/house.entity";
import { RentAndBuyEntity } from "@/modules/realEstate/owner/rent_buy/entities/rent-buy-entity";
import type { IRepository } from "../../interfaces/interface";
import { Repository } from "../../repositories/repository";

@injectable()
export class GetAllReportRentBuyUseCase
  implements
    IGUseCase<
      IResponse<IGPaginated<RentAndBuyEntity>>,
      IGPaginate<HouseEntity>
    >
{
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(
    input: IGPaginate<
      Pick<
        RentAndBuyEntity,
        "service_model" | "from_date" | "to_date" | "search" | "customer_id"
      >
    >
  ): Promise<void | IResponse<IGPaginated<RentAndBuyEntity>>> {
    return await this._api.getAllReportRentBuy(input);
  }
}

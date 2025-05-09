import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";
import { HouseEntity } from "@/modules/realEstate/owner/house/entities/house.entity";

@injectable()
export class getAllDistrictUseCase implements IUseCase {
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(id: HouseEntity): Promise<any> {
    return await this._api.getAllDistricts(id);
  }
}

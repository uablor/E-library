import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { RealEstateTypeRepository } from "../repositories/real-estate-type.repository";
import type { IRealEstateTypeRepository } from "../interfaces/real-estate-type.interface";
import { RealEstateTypeEntity } from "../entities/real-estate-type.entity";

@injectable()
export class UpdateRealEstateTypeUseCase implements IUseCase {
  constructor(
    @inject(RealEstateTypeRepository) private _api: IRealEstateTypeRepository
  ) {}

  async execute(input: RealEstateTypeEntity): Promise<any> {
    return await this._api.update(input);
  }
}

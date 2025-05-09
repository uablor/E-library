import { inject, injectable } from "tsyringe";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { RealEstateTypeEntity } from "../entities/real-estate-type.entity";
import { CreateRealEstateTypeUseCase } from "../use-cases/create.use-case";
import { GetAllRealEstateTypeUseCase } from "../use-cases/get-all.use-case";
import { UpdateRealEstateTypeUseCase } from "../use-cases/update.use-case";
import { DeleteRealEstateTypeUseCase } from "../use-cases/delete.use-case";

@injectable()
export class RealEstateTypeService {
  constructor(
    @inject(CreateRealEstateTypeUseCase)
    private _create: CreateRealEstateTypeUseCase,
    @inject(GetAllRealEstateTypeUseCase)
    private _getAll: GetAllRealEstateTypeUseCase,
    @inject(UpdateRealEstateTypeUseCase)
    private _update: UpdateRealEstateTypeUseCase,
    @inject(DeleteRealEstateTypeUseCase)
    private _delete: DeleteRealEstateTypeUseCase
  ) {}

  async register(input: RealEstateTypeEntity) {
    return await this._create.execute(input);
  }

  async update(input: RealEstateTypeEntity) {
    return await this._update.execute(input);
  }

  async delete(id: RealEstateTypeEntity) {
    return await this._delete.execute(id);
  }

  async getAll(
    input: IGPaginate<Pick<RealEstateTypeEntity, "name">>
  ): Promise<void | IResponse<IGPaginated<RealEstateTypeEntity>>> {
    return await this._getAll.execute(input);
  }
}

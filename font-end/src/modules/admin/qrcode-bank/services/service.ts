import { inject, injectable } from "tsyringe";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { CreateUseCase } from "../use-cases/create.use-case";
import { GetAllUseCase } from "../use-cases/get-all.use-case";
import { UpdateUseCase } from "../use-cases/update.use-case";
import { DeleteUseCase } from "../use-cases/delete.use-case";
import { GetOneUseCase } from "../use-cases/get-one.use-case";
import { PEntity } from "../entities/entity";

@injectable()
export class PService {
  constructor(
    @inject(CreateUseCase)
    private _create: CreateUseCase,
    @inject(GetAllUseCase)
    private _getAll: GetAllUseCase,
    @inject(UpdateUseCase)
    private _update: UpdateUseCase,
    @inject(DeleteUseCase)
    private _delete: DeleteUseCase,
    @inject(GetOneUseCase) private _getOne: GetOneUseCase
  ) {}

  async register(input: PEntity) {
    return await this._create.execute(input);
  }

  async update(input: PEntity) {
    return await this._update.execute(input);
  }

  async delete(id: PEntity) {
    return await this._delete.execute(id);
  }

  async getAll(
    input: IGPaginate<Pick<PEntity, "filename">>
  ): Promise<void | IResponse<IGPaginated<PEntity>>> {
    return await this._getAll.execute(input);
  }

  async getOne(id: PEntity): Promise<any> {
    return await this._getOne.execute(id);
  }
}

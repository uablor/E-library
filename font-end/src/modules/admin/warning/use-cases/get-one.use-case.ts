import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { PEntity } from "../entities/entity";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";

@injectable()
export class GetOneUseCase implements IUseCase {
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(id: PEntity): Promise<any> {
    return await this._api.getOne(id);
  }
}

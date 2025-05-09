import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";
import { PEntity } from "../entities/entity";

@injectable()
export class UpdateUseCase implements IUseCase {
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(input: PEntity): Promise<any> {
    return await this._api.update(input);
  }
}

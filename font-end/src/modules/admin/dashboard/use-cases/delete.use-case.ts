import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { DashboardEntity } from "../entities/entity";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";

@injectable()
export class DeleteUseCase implements IUseCase {
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(id: DashboardEntity): Promise<any> {
    return await this._api.delete(id);
  }
}

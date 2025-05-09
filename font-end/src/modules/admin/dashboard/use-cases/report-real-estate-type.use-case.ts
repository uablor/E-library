import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { Repository } from "../repositories/repository";
import type { IRepository } from "../interfaces/interface";

@injectable()
export class ReportRealEstateTypeUseCase implements IUseCase {
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(filter: any): Promise<any> {
    return await this._api.reportRealEstateTypes(filter);
  }
}

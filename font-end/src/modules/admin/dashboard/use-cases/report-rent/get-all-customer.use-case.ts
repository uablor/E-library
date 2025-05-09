import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import type { IRepository } from "../../interfaces/interface";
import { Repository } from "../../repositories/repository";

@injectable()
export class getAllCustomerUseCase implements IUseCase {
  constructor(@inject(Repository) private _api: IRepository) {}

  async execute(): Promise<any> {
    return await this._api.getAllCustomers();
  }
}

import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { FooterEntity } from "../entities/entity";
import { FooterRepository } from "../repositories/repository";
import type { IFooterRepository } from "../interfaces/interface";

@injectable()
export class GetOneUseCase implements IUseCase {
  constructor(@inject(FooterRepository) private _api: IFooterRepository) {}

  async execute(id: FooterEntity): Promise<any> {
    return await this._api.getOne(id);
  }
}

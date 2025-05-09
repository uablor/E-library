import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { PaymentEntity } from "../entities/payment.entity";
import { PaymentServiceHistoryHouseRepository } from "../repositories/payment-history.repository";
import type { IPaymentServiceHistoryHouseRepository } from "../interfaces/payment-history.interface";

@injectable()
export class UpdatePaymentServiceUseCase implements IUseCase {
  constructor(
    @inject(PaymentServiceHistoryHouseRepository)
    private _api: IPaymentServiceHistoryHouseRepository
  ) {}

  async execute(input: PaymentEntity): Promise<any> {
    return await this._api.updatePaymentService(input);
  }
}

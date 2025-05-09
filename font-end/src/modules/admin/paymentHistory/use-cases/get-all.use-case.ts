import type { IGUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { PaymentServiceHistoryHouseRepository } from "../repositories/payment-history.repository";
import type { IPaymentServiceHistoryHouseRepository } from "../interfaces/payment-history.interface";
import { PaymentEntity } from "../entities/payment.entity";

@injectable()
export class GetAllPaymentServiceHistoryHouseUseCase
  implements
    IGUseCase<IResponse<IGPaginated<PaymentEntity>>, IGPaginate<PaymentEntity>>
{
  constructor(
    @inject(PaymentServiceHistoryHouseRepository)
    private _api: IPaymentServiceHistoryHouseRepository
  ) {}

  async execute(
    input: IGPaginate<
      Pick<PaymentEntity, "status" | "date_payment" | "customer_id">
    >
  ): Promise<void | IResponse<IGPaginated<PaymentEntity>>> {
    try {
      return await this._api.getAll(input);
    } catch (error: any) {
      if (error.response.status === 422) {
        Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      }
    }
  }
}

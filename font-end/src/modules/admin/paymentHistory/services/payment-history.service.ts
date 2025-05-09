import { inject, injectable } from "tsyringe";
import { PaymentEntity } from "../entities/payment.entity";
import { GetAllPaymentServiceHistoryHouseUseCase } from "../use-cases/get-all.use-case";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { UpdatePaymentServiceUseCase } from "../use-cases/update-payment.use-case";

@injectable()
export class PaymentServiceHistoryHouseService {
  constructor(
    @inject(UpdatePaymentServiceUseCase)
    private _updatePaymentService: UpdatePaymentServiceUseCase,
    @inject(GetAllPaymentServiceHistoryHouseUseCase)
    private _getAll: GetAllPaymentServiceHistoryHouseUseCase
  ) {}

  //   async paymentService(input: PaymentEntity) {
  //     return await this._payment.execute(input);
  //   }

  //   async update(input: PaymentEntity) {
  //     return await this._update.execute(input);
  //   }

  async updatePaymentService(input: PaymentEntity) {
    return await this._updatePaymentService.execute(input);
  }

  async getAll(
    input: IGPaginate<
      Pick<PaymentEntity, "status" | "date_payment" | "customer_id">
    >
  ): Promise<void | IResponse<IGPaginated<PaymentEntity>>> {
    return await this._getAll.execute(input);
  }

  //   async getOne(id: number): Promise<any> {
  //     return await this._getOne.execute(id);
  //   }
}

import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { PaymentEntity } from "../entities/payment.entity";

export interface IPaymentServiceHistoryHouseRepository {
  updatePaymentService(input: PaymentEntity): Promise<any>;

  getAll(
    args: IGPaginate<
      Pick<PaymentEntity, "status" | "date_payment" | "customer_id">
    >
  ): Promise<IResponse<IGPaginated<PaymentEntity>>>;

  getOne(id: number): Promise<any>;
}

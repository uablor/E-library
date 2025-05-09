import { AxiosApi } from "@/common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import { PaymentEntity } from "../entities/payment.entity";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IPaymentServiceHistoryHouseRepository } from "../interfaces/payment-history.interface";

@injectable()
export class PaymentServiceHistoryHouseRepository
  implements IPaymentServiceHistoryHouseRepository
{
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async updatePaymentService(
    input: PaymentEntity
  ): Promise<IResponse<PaymentEntity>> {
    const url =
      input.type === "confirm"
        ? `/admin/confirm/payment/service-charge/${input.id}`
        : `/admin/reject/payment/service-charge/${input.id}`;

    const response = await this._api.axios({
      method: "post",
      url: url,
    });

    return {
      data: response.data,
      message: "ສຳເລັດເເລ້ວ",
      status: "success",
    };
  }

  async getAll(
    args: IGPaginate<
      Pick<PaymentEntity, "status" | "date_payment" | "customer_id">
    >
  ): Promise<IResponse<IGPaginated<PaymentEntity>>> {
    const response = await this._api.axios({
      url: "/admin/payment/service-charge",
      params: {
        page: args.page,
        per_page: args.limit,
        real_estate_account_id: args.filter?.customer_id,
        status: args.filter?.status,
        date_payment: args.filter?.date_payment,
      },
    });

    const { data, pagination } = response.data.data;

    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }

  async getOne(id: number): Promise<any> {
    const response = await this._api.axios({
      method: "get",
      url: `/owner/payment/service-charge/${id}`,
    });

    return response.data;
  }
}

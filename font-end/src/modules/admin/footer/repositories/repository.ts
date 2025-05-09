import { AxiosApi } from "@/common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { FooterEntity } from "../entities/entity";
import { IFooterRepository } from "../interfaces/interface";

@injectable()
export class FooterRepository implements IFooterRepository {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: FooterEntity): Promise<IResponse<FooterEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/admin/create-footer`,
      data: {
        facebook: input.facebook,
        whatsapp: input.whatsapp,
        wechat: input.wechat,
        line: input.line,
        phone: input.phone,
        email: input.email,
        shop_on: input.shop_on,
        payment_information: input.payment_information,
        customer_service: input.customer_service,
      },
    });

    return {
      data: response.data,
      message: "ສຳເລັດເເລ້ວ",
      status: "success",
    };
  }

  async update(input: FooterEntity): Promise<IResponse<FooterEntity>> {
    const response = await this._api.axios({
      method: "put",
      url: `/admin/update-footer/${input.id}`,
      data: {
        facebook: input.facebook,
        whatsapp: input.whatsapp,
        wechat: input.wechat,
        line: input.line,
        phone: input.phone,
        email: input.email,
        shop_on: input.shop_on,
        payment_information: input.payment_information,
        customer_service: input.customer_service,
      },
    });

    return {
      data: response.data,
      message: "ອັບເດດ ສຳເລັດ",
      status: "success",
    };
  }

  async delete(id: FooterEntity): Promise<IResponse<FooterEntity>> {
    const response = await this._api.axios({
      method: "delete",
      url: `/admin/delete-footer/${id}`,
    });

    return {
      data: response.data,
      message: "ສຳເລັດເເລ້ວ.",
      status: "success",
    };
  }

  async getAll(
    args: IGPaginate<Pick<FooterEntity, "email">>
  ): Promise<IResponse<IGPaginated<FooterEntity>>> {
    const response = await this._api.axios({
      url: "/admin/list-footers",
      params: {
        page: args.page,
        per_page: args.limit,
        filter: args.filter?.email,
      },
    });

    const { data, pagination } = response.data.data;

    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }

  async getOne(id: FooterEntity): Promise<any> {
    const response = await this._api.axios({
      url: `/admin/list-footer/${id}`,
    });

    return response.data;
  }
}

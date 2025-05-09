import { AxiosApi } from "@/common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { PEntity } from "../entities/entity";
import { IRepository } from "../interfaces/interface";

@injectable()
export class Repository implements IRepository {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: PEntity): Promise<IResponse<PEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/admin/create-policy`,
      data: {
        policy_type: input.policy_type,
        title: input.title,
        description: input.description,
      },
    });

    return {
      data: response.data,
      message: "ສຳເລັດເເລ້ວ",
      status: "success",
    };
  }

  async update(input: PEntity): Promise<IResponse<PEntity>> {
    const response = await this._api.axios({
      method: "put",
      url: `/admin/update-policy/${input.id}`,
      data: {
        title: input.title,
        description: input.description,
      },
    });

    return {
      data: response.data,
      message: "ອັບເດດ ສຳເລັດ",
      status: "success",
    };
  }

  async delete(id: PEntity): Promise<IResponse<PEntity>> {
    const response = await this._api.axios({
      method: "delete",
      url: `/admin/delete-policy/${id}`,
    });

    return {
      data: response.data,
      message: "ສຳເລັດເເລ້ວ.",
      status: "success",
    };
  }

  async getAll(
    args: IGPaginate<Pick<PEntity, "policy_type">>
  ): Promise<IResponse<IGPaginated<PEntity>>> {
    const response = await this._api.axios({
      url: "/admin/list-policies",
      params: {
        page: args.page,
        per_page: args.limit,
        filter: args.filter?.policy_type,
      },
    });

    const { data, pagination } = response.data.data;

    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }

  async getOne(id: PEntity): Promise<any> {
    const response = await this._api.axios({
      url: `/admin/list-policy/${id}`,
    });

    return response.data;
  }
}

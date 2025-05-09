import { AxiosApi } from "@/common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { RealEstateTypeEntity } from "../entities/real-estate-type.entity";
import { IRealEstateTypeRepository } from "../interfaces/real-estate-type.interface";

@injectable()
export class RealEstateTypeRepository implements IRealEstateTypeRepository {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(
    input: RealEstateTypeEntity
  ): Promise<IResponse<RealEstateTypeEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: "/admin/create-real-state-type",
      data: {
        name: input.name,
      },
    });

    return {
      data: response.data,
      message: "ສຳເລັດເເລ້ວ",
      status: "success",
    };
  }

  async update(
    input: RealEstateTypeEntity
  ): Promise<IResponse<RealEstateTypeEntity>> {
    const response = await this._api.axios({
      method: "put",
      url: "/admin/update-real-state-type/" + input.id,
      params: {
        name: input.name,
      },
    });

    return {
      data: response.data,
      message: "ອັບເດດ ສຳເລັດ",
      status: "success",
    };
  }

  async delete(
    id: RealEstateTypeEntity
  ): Promise<IResponse<RealEstateTypeEntity>> {
    const response = await this._api.axios({
      method: "delete",
      url: `/admin/delete-real-state-type/${id}`,
    });

    return {
      data: response.data,
      message: "ລຶບຂໍ້ມູນ ສຳເລັດເເລ້ວ.",
      status: "success",
    };
  }

  async getAll(
    args: IGPaginate<Pick<RealEstateTypeEntity, "name">>
  ): Promise<IResponse<IGPaginated<RealEstateTypeEntity>>> {
    const response = await this._api.axios({
      url: "/admin/list-real-state-types",
      params: {
        page: args.page,
        per_page: args.limit,
        filter: args.filter?.name,
      },
    });

    const { data, pagination } = response.data.data;

    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }

  async getById(id: any): Promise<any> {
    console.log(id);
  }
}

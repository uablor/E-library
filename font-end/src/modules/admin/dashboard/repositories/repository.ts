import { AxiosApi } from "@/common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { DashboardEntity } from "../entities/entity";
import { IRepository } from "../interfaces/interface";
import { HouseEntity } from "@/modules/realEstate/owner/house/entities/house.entity";
import { RentAndBuyEntity } from "@/modules/realEstate/owner/rent_buy/entities/rent-buy-entity";
// import { formatDate } from "@/common/utils/format.date";

@injectable()
export class Repository implements IRepository {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: DashboardEntity): Promise<IResponse<DashboardEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/admin/create-footer`,
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

  async update(input: DashboardEntity): Promise<IResponse<DashboardEntity>> {
    const response = await this._api.axios({
      method: "put",
      url: `/admin/update-footer/${input.id}`,
      data: {
        name: input.name,
      },
    });

    return {
      data: response.data,
      message: "ອັບເດດ ສຳເລັດ",
      status: "success",
    };
  }

  async delete(id: DashboardEntity): Promise<IResponse<DashboardEntity>> {
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
    args: IGPaginate<
      Pick<
        HouseEntity,
        | "real_estate_type_id"
        | "service_model"
        | "room_type"
        | "search"
        | "district_id"
        | "province_id"
        | "country_id"
      >
    >
  ): Promise<IResponse<IGPaginated<HouseEntity>>> {
    const response = await this._api.axios({
      url: "/admin/report-real-estate-list",
      params: {
        page: args.page,
        per_page: args.limit,
        room_type: args.filter?.room_type,
        real_estate_type_id: args.filter?.real_estate_type_id,
        service_model: args.filter?.service_model,
        search: args.filter?.search,
        district_id: args.filter?.district_id,
        province_id: args.filter?.province_id,
        country_id: args.filter?.country_id,
        lang: localStorage.getItem("locale"),
      },
    });

    const { data, pagination } = response.data.data;

    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }

  async getCountries(): Promise<any> {
    const response = await this._api.axios({
      url: `/countries`,
    });

    return response.data;
  }

  async getAllProvinces(id: HouseEntity): Promise<any> {
    const response = await this._api.axios({
      url: `/provinces/${id}`,
    });

    return response.data;
  }

  async getAllDistricts(id: HouseEntity): Promise<any> {
    const response = await this._api.axios({
      url: `/districts/${id}`,
    });

    return response.data;
  }

  async reportRealEstateTypes(filter: any): Promise<any> {
    const response = await this._api.axios({
      url: `/admin/dashboard`,
      params: {
        country_id: filter.country_id,
        lang: localStorage.getItem("locale"),
      },
    });

    return response.data;
  }

  async getAllReportRentBuy(
    args: IGPaginate<
      Pick<
        RentAndBuyEntity,
        "service_model" | "from_date" | "to_date" | "search" | "customer_id"
      >
    >
  ): Promise<IResponse<IGPaginated<RentAndBuyEntity>>> {
    // const fromDate = args.filter?.from_date;
    // const toDate = args.filter?.to_date;
    // let startDate = "";
    // let endDate = "";

    // if (fromDate instanceof Date) {
    //   const year = fromDate.getFullYear();
    //   const month = (fromDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month as it's zero-based
    //   const day = fromDate.getDate().toString().padStart(2, "0");

    //   startDate = `${year}-${month}-${day}`;
    // }

    // if (toDate instanceof Date) {
    //   const year = toDate.getFullYear();
    //   const month = (toDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to month as it's zero-based
    //   const day = toDate.getDate().toString().padStart(2, "0");

    //   endDate = `${year}-${month}-${day}`;
    // }

    const response = await this._api.axios({
      url: "/admin/report-rent-and-buy",
      params: {
        page: args.page,
        per_page: args.limit,
        service_model: args.filter?.service_model,
        start_date: args.filter?.from_date,
        end_date: args.filter?.to_date,
        // start_date: startDate ? formatDate(startDate) : null,
        // end_date: endDate ? formatDate(endDate) : null,
        customer_id: args.filter?.customer_id,
        search: args.filter?.search,
        lang: localStorage.getItem("locale"),
      },
    });

    const { data } = response.data;
    return {
      data: {
        props: data.data.data,
        total: data.data.pagination.total,
        summary: data.totalPrice,
        currency: data.currency,
      },
      status: "success",
    };
  }

  async getAllCustomers(): Promise<any> {
    const response = await this._api.axios({
      url: `/customers`,
    });

    return response.data;
  }

  async getAllAppointmentPending(): Promise<any> {
    const response = await this._api.axios({
      url: `/owner/count-appointment-pending`,
    });

    return response.data;
  }
}

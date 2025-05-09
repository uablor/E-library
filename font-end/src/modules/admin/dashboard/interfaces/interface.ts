import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { DashboardEntity } from "../entities/entity";
import { HouseEntity } from "@/modules/realEstate/owner/house/entities/house.entity";
import { RentAndBuyEntity } from "@/modules/realEstate/owner/rent_buy/entities/rent-buy-entity";

export interface IRepository {
  create(input: DashboardEntity): Promise<any>;

  update(input: DashboardEntity): Promise<any>;

  delete(id: DashboardEntity): Promise<any>;

  getAll(
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
  ): Promise<IResponse<IGPaginated<HouseEntity>>>;

  reportRealEstateTypes(filter: any): Promise<any>;

  getCountries(): Promise<any>;

  getAllProvinces(id: HouseEntity): Promise<any>;

  getAllDistricts(id: HouseEntity): Promise<any>;

  getAllReportRentBuy(
    args: IGPaginate<
      Pick<
        RentAndBuyEntity,
        "service_model" | "from_date" | "to_date" | "search" | "customer_id"
      >
    >
  ): Promise<IResponse<IGPaginated<RentAndBuyEntity>>>;

  getAllCustomers(): Promise<any>;

  getAllAppointmentPending(): Promise<any>;
}

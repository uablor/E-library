import { reactive } from "vue";
import { DashboardEntity } from "../entities/entity";
import { DashboardService } from "../services/service";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { RentAndBuyEntity } from "@/modules/realEstate/owner/rent_buy/entities/rent-buy-entity";

export const reportRentBuyStore = defineStore("report-rent-buy-store", () => {
  const dashboardService =
    container.resolve<DashboardService>(DashboardService);

  const state = reactive<IGState<IGPaginated<DashboardEntity>>>({
    data: {
      props: [],
      total: 0,
      summary: "",
      currency: "",
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const getCustomers = reactive<any>({
    data: {
      props: [],
    },
  });

  const appointmentPending = reactive<any>({
    data: {
      props: "",
    },
  });

  type FilterType = Pick<
    RentAndBuyEntity,
    "service_model" | "from_date" | "to_date" | "search" | "customer_id"
  >;
  const setStateFilter = reactive<IGPaginate<FilterType>>({
    page: 1,
    limit: 10,
    filter: {
      service_model: "",
      from_date: "",
      to_date: "",
      search: "",
      customer_id: "",
    },
  });

  const form = reactive<RentAndBuyEntity>({});

  async function getAllReportRentBuy() {
    state.isLoading = true;
    const results = await dashboardService.getAllReportRentBuy({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results?.status === "success") {
      state.data.props = results.data.props;
      state.data.total = results.data.total;
      state.data.summary = results.data.summary;
      state.data.currency = results.data.currency;
      state.isLoading = false;
    }
  }

  async function getAllCustomers() {
    const results = await dashboardService.getAllCustomers();

    if (results && results.data && results?.message === "success") {
      getCustomers.data.props = results.data;
    }
  }

  async function getAllAppointmentPending() {
    const results = await dashboardService.getAllAppointmentPending();

    if (results && results.data && results?.message === "success") {
      appointmentPending.data.props = results.data;
    }
  }

  return {
    form,
    setStateFilter,
    state,
    getAllReportRentBuy,
    getAllCustomers,
    getCustomers,
    getAllAppointmentPending,
    appointmentPending,
  };
});

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
import { HouseEntity } from "@/modules/realEstate/owner/house/entities/house.entity";

export const dashboardStore = defineStore("dashboard-store", () => {
  const dashboardService =
    container.resolve<DashboardService>(DashboardService);

  const state = reactive<IGState<IGPaginated<DashboardEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const getRealEstateTypes = reactive<any>({
    data: {
      props: [],
    },
  });

  const getCountries = reactive<any>({
    data: {
      props: [],
    },
  });

  const getProvinces = reactive<any>({
    data: {
      props: [],
    },
  });

  const getDistricts = reactive<any>({
    data: {
      props: [],
    },
  });

  type FilterType = Pick<
    HouseEntity,
    | "real_estate_type_id"
    | "service_model"
    | "room_type"
    | "search"
    | "district_id"
    | "province_id"
    | "country_id"
  >;
  const setStateFilter = reactive<IGPaginate<FilterType>>({
    page: 1,
    limit: 10,
    filter: {
      real_estate_type_id: "",
      service_model: "",
      room_type: "",
      search: "",
      district_id: "",
      province_id: "",
      country_id: "",
    },
  });

  const form = reactive<HouseEntity>({});

  /** My Function */
  async function register() {
    state.isLoading = true;
    state.btnLoading = true;

    try {
      await dashboardService.register(form);
      await getAllRealEstate();

      state.error = "";
    } catch (error: any) {
      let responseError = "";
      if (error.response.status === 422) {
        responseError = Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      }
      state.error = responseError;
    }
    state.isLoading = false;
    state.btnLoading = false;
  }

  async function update() {
    state.isLoading = true;
    state.btnLoading = true;

    try {
      await dashboardService.update(form);
      await getAllRealEstate();
      await clearData();
      state.error = "";
    } catch (error: any) {
      let responseError = "";
      if (error.response.status === 422) {
        responseError = Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      }
      state.error = responseError;
    }
    state.isLoading = false;
    state.btnLoading = false;
  }

  async function remove(id: DashboardEntity) {
    state.isLoading = true;

    try {
      await dashboardService.delete(id);
      await getAllRealEstate();

      state.error = "";
    } catch (error: any) {
      let responseError = "";
      if (error.response.status === 422) {
        responseError = Object.keys(error.response.data.errors)
          .map((key) => `${key}: ${error.response.data.errors[key].join(", ")}`)
          .join("; ");
      }
      state.error = responseError;
    }
    state.isLoading = false;
  }

  async function reportRealEstateTypes() {
    state.isLoading = true;
    const response = await dashboardService.reportRealEstateTypes(
      setStateFilter.filter
    );

    if (response && response.data && response.message === "success") {
      getRealEstateTypes.data.props = response.data;
      state.isLoading = false;
    }
  }

  async function getAllRealEstate() {
    state.isLoading = true;
    const results = await dashboardService.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results?.status === "success") {
      state.data.props = results.data.props;
      state.data.total = results.data.total;
      state.isLoading = false;
    }
  }

  async function getAllCountries() {
    const results = await dashboardService.getCountries();

    if (results && results.data && results?.message === "success") {
      getCountries.data.props = results.data;
    }
  }

  async function getAllProvinces(id: HouseEntity) {
    const results = await dashboardService.getAllProvinces(id);

    if (results && results.data && results?.message === "success") {
      getProvinces.data.props = results.data;
    }
  }

  async function getAllDistricts(id: HouseEntity) {
    const results = await dashboardService.getAllDistricts(id);

    if (results && results.data && results?.message === "success") {
      getDistricts.data.props = results.data;
    }
  }

  async function clearData() {}

  return {
    register,
    update,
    remove,
    reportRealEstateTypes,
    getAllRealEstate,
    form,
    setStateFilter,
    state,
    getAllCountries,
    getCountries,
    getAllProvinces,
    getProvinces,
    getAllDistricts,
    getDistricts,
    getRealEstateTypes,
  };
});

import { reactive } from "vue";
import { FooterEntity } from "../entities/entity";
import { FooterService } from "../services/service";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";

export const footerStore = defineStore("footer-store", () => {
  const footerService = container.resolve<FooterService>(FooterService);

  const state = reactive<IGState<IGPaginated<FooterEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const getFooter = reactive<any>({
    data: {
      props: "",
    },
  });

  const setStateFilter = reactive<IGPaginate<Pick<FooterEntity, "email">>>({
    page: 1,
    limit: 10,
    filter: { email: "" },
  });

  const form = reactive<FooterEntity>({});

  /** My Function */
  async function register() {
    state.isLoading = true;
    state.btnLoading = true;

    try {
      await footerService.register(form);
      await getAll();

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
      await footerService.update(form);
      await getAll();
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

  async function remove(id: FooterEntity) {
    state.isLoading = true;

    try {
      await footerService.delete(id);
      await getAll();

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

  async function getOne(id: FooterEntity) {
    state.isLoading = true;
    const response = await footerService.getOne(id);
    if (response && response.data && response.message === "success") {
      getFooter.data.props = response.data;
      state.isLoading = false;
    }
  }

  async function getAll() {
    state.isLoading = true;
    const results = await footerService.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results?.status == "success") {
      state.data.props = results.data.props;
      state.data.total = results.data.total;
      state.isLoading = false;
    }
  }

  async function clearData() {
    form.facebook = "";
    form.whatsapp = "";
    form.wechat = "";
    form.line = "";
    form.phone = "";
    form.email = "";
    form.shop_on = "";
    form.payment_information = "";
    form.customer_service = "";
  }

  return {
    register,
    update,
    remove,
    getOne,
    getAll,
    form,
    setStateFilter,
    state,
    getFooter,
  };
});

import { reactive } from "vue";
import { PEntity } from "../entities/entity";
import { PService } from "../services/service";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";

export const adminAboutStore = defineStore("admin-about-store", () => {
  const service = container.resolve<PService>(PService);

  const state = reactive<IGState<IGPaginated<PEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const getById = reactive<any>({
    data: {
      props: "",
    },
  });

  const setStateFilter = reactive<IGPaginate<Pick<PEntity, "title">>>({
    page: 1,
    limit: 10,
    filter: { title: "" },
  });

  const form = reactive<PEntity>({});

  /** My Function */
  async function register() {
    state.isLoading = true;
    state.btnLoading = true;

    try {
      await service.register(form);
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
      await service.update(form);
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

  async function remove(id: PEntity) {
    state.isLoading = true;

    try {
      await service.delete(id);
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

  async function getOne(id: PEntity) {
    state.isLoading = true;
    const response = await service.getOne(id);
    if (response && response.data && response.message === "success") {
      getById.data.props = response.data;
      state.isLoading = false;
    }
  }

  async function getAll() {
    state.isLoading = true;
    const results = await service.getAll({
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
    form.title = "";
    form.link_videos = "";
    form.description = "";
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
    getById,
  };
});

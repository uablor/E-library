import { reactive } from "vue";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";

export const adminUserStore = defineStore("admin-user-store", () => {
  const service = container.resolve<UserService>(UserService);

  const state = reactive<IGState<IGPaginated<UserEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  type FilterType = Pick<UserEntity, "name" | "role">;
  const setStateFilter = reactive<IGPaginate<FilterType>>({
    page: 1,
    limit: 10,
    filter: {
      name: "",
      role: "",
    },
  });

  const form = reactive<UserEntity>({
    id: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const allRole = reactive<any>({
    data: {
      props: [],
    },
  });

  const allPermission = reactive<any>({
    data: {
      props: "",
    },
  });

  const userGetByOne = reactive<any>({
    data: {
      props: "",
    },
  });

  const getUserProfile = reactive<any>({
    data: {
      props: "",
    },
  });

  /** My Function */
  async function register() {
    state.isLoading = true;
    state.btnLoading = true;

    try {
      await service.register(form);

      state.error = "";
      await clearData();
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

      state.error = "";
      form.name = "";
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

  async function remove(id: UserEntity) {
    state.isLoading = true;

    try {
      await service.delete(id);
      await getAll();

      state.error = "";
      form.name = "";
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

  async function getOne(id: number) {
    const response = await service.getOne(id);

    if (response && response.data && response.message == "success") {
      userGetByOne.data.props = response.data;
    }
  }

  async function getAll() {
    state.isLoading = true;
    const results = await service.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results.status == "success") {
      state.data.props = results.data.props;
      state.data.total = results.data.total;
      state.isLoading = false;
    }
  }

  async function getAllRole() {
    const response = await service.getAllRole();

    if (response && response.data && response.message == "success") {
      allRole.data.props = response.data;
    }
  }

  async function getAllPermission() {
    const response = await service.getAllPermission();

    if (response && response.data && response.message == "success") {
      allPermission.data.props = response.data;
    }
  }

  async function getProfile() {
    const response = await service.getProfile();

    if (response && response.data && response.message === "success") {
      getUserProfile.data.props = response.data;
    }
  }

  async function updateProfile() {
    state.isLoading = true;
    state.btnLoading = true;

    try {
      await service.updateProfile(form);

      state.error = "";
      form.name = "";
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

  async function clearData() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.password_confirmation = "";
    form.permissionIds = [];
    form.role = "";
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
    allRole,
    getAllRole,
    allPermission,
    getAllPermission,
    userGetByOne,
    getUserProfile,
    getProfile,
    updateProfile,
  };
});

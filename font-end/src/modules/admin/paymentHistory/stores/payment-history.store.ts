import { reactive } from "vue";
import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { PaymentEntity } from "../entities/payment.entity";
import { PaymentServiceHistoryHouseService } from "../services/payment-history.service";

export const paymentServiceHistoryStore = defineStore(
  "payment-history-store",
  () => {
    const service = container.resolve<PaymentServiceHistoryHouseService>(
      PaymentServiceHistoryHouseService
    );

    const state = reactive<IGState<IGPaginated<PaymentEntity>>>({
      data: {
        props: [],
        total: 0,
      },
      isLoading: false,
      btnLoading: false,
      error: "",
    });

    const form = reactive<PaymentEntity>({
      id: "",
      type: "",
      real_estate_list_id: "",
      service_charge_id: "",
      fromDate: new Date(),
      quantity: 0,
      paySlip: "",
      customer_id: "",
    });

    type FilterType = Pick<
      PaymentEntity,
      "date_payment" | "status" | "customer_id"
    >;
    const setStateFilter = reactive<IGPaginate<FilterType>>({
      page: 1,
      limit: 10,
      filter: {
        status: "",
        date_payment: null,
      },
    });

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

    async function updatePaymentService(input: PaymentEntity) {
      state.isLoading = true;

      try {
        await service.updatePaymentService(input);

        state.error = "";
      } catch (error: any) {
        if (error.response) {
          switch (error.response.status) {
            case 422:
              let responseError = "";
              responseError = Object.keys(error.response.data.errors)
                .map(
                  (key) =>
                    `${key}: ${error.response.data.errors[key].join(", ")}`
                )
                .join("; ");
              state.error = responseError;
              break;
            case 413:
              state.error = "Payload Too Large";
              break;
            case 429:
              state.error = "Too Many Requests";
              break;
            case 500:
              state.error = error.message;
              break;
            case 404:
              state.error = error.message;
              break;
            case 405:
              state.error = error.message;
              break;
            default:
              state.error = "An unexpected error occurred";
          }
        } else {
          state.error = "Network Error";
        }
      } finally {
        state.isLoading = false;
      }
    }

    return {
      form,
      state,
      setStateFilter,
      getAll,
      updatePaymentService,
    };
  }
);

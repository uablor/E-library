import { roleGuard } from "@/common/guards/role.guard";
import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const adminPaymentHistoryRoute: RouteRecordRaw[] = [
  {
    path: "/admin/payment/history",
    name: "admin.payment.history",
    component: () => import("../views/ListPaymentHistory.vue"),
    meta: {
      label: "sidebar.payment_history",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
];

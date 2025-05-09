import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";

export const adminDashboardRoute: RouteRecordRaw[] = [
  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      label: "sidebar.dashboard",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
  {
    path: "/admin/report/realestate",
    name: "report.real.estate",
    component: () => import("../views/Report-Real-Estate.vue"),
    meta: {
      label: "sidebar.report_real_estate",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
  {
    path: "/admin/report/rent/buy",
    name: "report.rent.buy",
    component: () => import("../views/Report-Rent-Buy.vue"),
    meta: {
      label: "sidebar.footer",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
];

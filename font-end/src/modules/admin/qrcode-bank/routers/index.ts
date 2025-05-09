import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";

export const adminQrcodeBankRoute: RouteRecordRaw[] = [
  {
    path: "/admin/qrcode/bank",
    name: "admin.qrcode.bank",
    component: () => import("../views/ListView.vue"),
    meta: {
      label: "sidebar.warning",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
];

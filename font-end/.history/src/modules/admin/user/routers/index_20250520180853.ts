import { roleGuard } from "@/common/guards/role.guard";
import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const adminUserRoute: RouteRecordRaw[] = [
  {
    path: "/admin/user",
    name: "admin.user",
    component: () => import("../views/UserMangement.vue"),
    meta: {
      label: "sidebar.user",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },
   {
    path: "/admin/user",
    name: "admin.user",
    component: () => import("../views.vue"),
    meta: {
      label: "sidebar.user",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  }
];

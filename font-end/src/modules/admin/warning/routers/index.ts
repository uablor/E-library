import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";

export const adminWarningRoute: RouteRecordRaw[] = [
  {
    path: "/admin/warning",
    name: "admin.warning",
    component: () => import("../views/ListView.vue"),
    meta: {
      label: "sidebar.warning",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
  {
    path: "/admin/warning/edit/:id",
    name: "admin.edit.warning",
    component: () => import("../views/Edit.vue"),
    meta: {
      label: "sidebar.warning",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
  // {
  //   path: "/footer/add",
  //   name: "add.footer",
  //   component: () => import("../views/Add-Footer.vue"),
  //   meta: {
  //     label: "sidebar.footer",
  //     requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
  //   },
  //   beforeEnter: roleGuard,
  // },
];

import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";

export const adminPolicyRoute: RouteRecordRaw[] = [
  {
    path: "/admin/policy",
    name: "admin.policy",
    component: () => import("../views/ListView.vue"),
    meta: {
      label: "sidebar.policy",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
  {
    path: "/admin/policy/edit/:id",
    name: "admin.edit.policy",
    component: () => import("../views/Edit.vue"),
    meta: {
      label: "sidebar.policy",
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

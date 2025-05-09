import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";

export const adminFooterRoute: RouteRecordRaw[] = [
  {
    path: "/admin/footer",
    name: "footer",
    component: () => import("../views/Edit-Footer.vue"),
    meta: {
      label: "sidebar.footer",
      requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    beforeEnter: roleGuard,
  },
  // {
  //   path: "/footer/edit/:id",
  //   name: "edit.footer",
  //   component: () => import("../views/Edit-Footer.vue"),
  //   meta: {
  //     label: "sidebar.footer",
  //     requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
  //   },
  //   beforeEnter: roleGuard,
  // },
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

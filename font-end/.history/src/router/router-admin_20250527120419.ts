
import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";
import {adminUserRoute} from "@/modules/admin/user/routers/index";
import {adminDashboardRoute} from "@/modules/admin/dashboard/routers/index";
import {adminBooksRoute} from "@/modules/admin/book/routers/index";
import 
export const AdminRoute: RouteRecordRaw[] = [
  {
    path: "/admin/about/",
    name: "admin.about",
    component: () => import("@/components/layouts_admin/AppLayout.vue"),
    meta: {
      label: "sidebar.about",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER], 
      skipAuthCheck: true,
    },
    children:[
      ...authRoute,
      ...adminDashboardRoute,
      ...adminUserRoute,
      ...adminBooksRoute
    ]
    // beforeEnter: roleGuard,
  },
  // {
  //   path: "/admin/about/edit/:id",
  //   name: "admin.edit.about",
  //   component: () => import("../views/Edit.vue"),
  //   meta: {
  //     label: "sidebar.about",
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

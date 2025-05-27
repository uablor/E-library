import { roleGuard } from "@/common/guards/role.guard";
import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const adminBooksRoute: RouteRecordRaw[] = [
  {
    path: "/admin/book_type_category",
    name: "admin.book_type_category",
    component: () => import("../views/booktype_category/BookType_Category.vue"),
    meta: {
      label: "sidebar.book_type_category",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },{
      path: "/admin/book",
    name: "admin.book",
    component: () => import("../views/booktype_category/Books.vue"),
    meta: {
      label: "sidebar.book",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  },{
      path: "/admin/book_sc",
    name: "admin.book",
    component: () => import("../views/booktype_category/Books.vue"),
    meta: {
      label: "sidebar.book",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  }
];

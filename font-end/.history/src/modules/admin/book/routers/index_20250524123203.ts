import { roleGuard } from "@/common/guards/role.guard";
import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const adminBooksRoute: RouteRecordRaw[] = [
 {
    path: "/admin/book_scor",
    name: "admin.book_score_and_file",
    component: () => import("../views/BookScore_BookFile/table_for_Score_and_file.vue"),
    meta: {
      label: "sidebar.book_score_and_file",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  },{
    path: "/admin/book",
    name: "admin.book",
    component: () => import("../views/Book.vue"),
    meta: {
      label: "sidebar.book",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  },{
    path: "/admin/bookCategory",
    name: "admin.bookCategory",
    component: () => import("../views/BookCategory.vue"),
    meta: {
      label: "sidebar.bookCategory",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  },{
    path: "/admin/booktype",
    name: "admin.booktype",
    component: () => import("../views/BookType.vue"),
    meta: {
      label: "sidebar.booktype",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  },{
    path: "/admin/bookfile",
    name: "admin.bookfile",
    component: () => import("../views/BookFile.vue"),
    meta: {
      label: "sidebar.bookfile",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  }
];

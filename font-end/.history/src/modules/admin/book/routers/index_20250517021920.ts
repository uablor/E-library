import { roleGuard } from "@/common/guards/role.guard";
import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const adminBooksRoute: RouteRecordRaw[] = [
  {
    path: "/admin/book_type_category",
    name: "admin.book_type_category",
    component: () => import("../views/BookType_Category"),
    meta:{
      label: "sidebar.book_type_category",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },
  {path: "/admin/books",
    name: "admin.books",
    component: () => import("../views/Books.vue"),
    meta: {
      label: "sidebar.books",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  },{
    path: "/admin/book_score_and_file",
    name: "admin.book_score_and_file",
    component: () => import("../views/booktype_category/BookScore_BookFile/table_for_Score_and_file.vue"),
    meta: {
      label: "sidebar.book_score_and_file",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
  }
];

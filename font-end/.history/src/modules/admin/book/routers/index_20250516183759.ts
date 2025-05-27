import { roleGuard } from "@/common/guards/role.guard";
import { GET_ROLES } from "@/common/utils/const";
import type { RouteRecordRaw } from "vue-router";

export const adminBooksRoute: RouteRecordRaw[] = [
  {
    path: "/admin/book",
    name: "admin.book",
    component: () => import("../views/booktype_category/BookType_Category.vue"),
    meta: {
      label: "sidebar.book",
      // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
    },
    // beforeEnter: roleGuard,
  },{
    
  }
];

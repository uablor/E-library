
import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";

export const ClientRoute: RouteRecordRaw[] = [
  {
    path: "/register",
    name: "/register",
    component: () => import("@/modules/auth/views/Register.vue"),
    meta: {
      skipAuthCheck: true,
    },
    // children: [
    //   { 
    //     path: "/home",
    //     name: "default.home",
    //     component: () => import("../views/homepage/home.vue"),
    //      meta: {
    //     skipAuthCheck: true,
    //     }
    //   },
    //   { 
    //     path: "/about",
    //     name: "default.about",
    //     component: () => import("../views/homepage/About.vue"),
    //      meta: {
    //     skipAuthCheck: true,
    //     }
    //   }
    // ],
    // beforeEnter: roleGuard,
  },
];

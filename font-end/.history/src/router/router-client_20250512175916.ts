
import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";
import { HomeRoute } from "@/modules/clients/home/routers/index";
// import { HomeRoute } from "@/modules/clients/home/routers";
export const ClientRoute: RouteRecordRaw[] = [
  {
    path: "/client",
    name: "/client",
    component: () => import("@/modules/auth/views/Register.vue"),
    meta: {
      skipAuthCheck: true,
    },
    children: [
      ...HomeRoute
    ],
    // beforeEnter: roleGuard,
  },
];
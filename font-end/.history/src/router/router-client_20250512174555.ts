
import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";
import {}
// import { HomeRoute } from "@/modules/clients/home/routers";
export const ClientRoute: RouteRecordRaw[] = [
  {
    path: "/client/register",
    name: "/client/register",
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
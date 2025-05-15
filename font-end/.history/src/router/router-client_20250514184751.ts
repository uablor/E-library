
import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";
import { HomeRoute } from "@/modules/clients/home/routers/index";
import { BookDetailsRoute } from "@/modules/clients/bookDetails/routers/index";
import {}
// import { HomeRoute } from "@/modules/clients/home/routers";
export const ClientRoute: RouteRecordRaw[] = [
  {
    path: "/client",
    name: "/client",
    // component: () => import("@/components/layouts/AppLayout.vue"),
    meta: {
      skipAuthCheck: true,
    },
    children: [
      ...HomeRoute,
      ...BookDetailsRoute
    ],
    // beforeEnter: roleGuard,
  },
];
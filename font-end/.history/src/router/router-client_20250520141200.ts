
import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";
import { HomeRoute } from "@/modules/clients/home/routers/index";
import { BookDetailsRoute } from "@/modules/clients/bookDetails/routers/index";
import {TrendingBooksRoute} from "@/modules/clients/TrendingBooks/routers/index";
import {ClientRouteRegister} from "@/modules/auth/routers";
import {UserRoute} from "@/modules/clients/Users/routers/index";
// import { HomeRoute } from "@/modules/clients/home/routers";
export const ClientRoute: RouteRecordRaw[] = [
  {
    path: "/client",
    name: "/client",
    component: () => import("@/"),
    meta: {
      skipAuthCheck: true,
    },
    children: [
      ...HomeRoute,
      ...BookDetailsRoute,
      ...TrendingBooksRoute,
      ...ClientRouteRegister,
      ...UserRoute
    ],
    // beforeEnter: roleGuard,
  },
];
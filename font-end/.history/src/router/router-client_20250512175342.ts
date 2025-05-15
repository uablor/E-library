import { roleGuard } from "@/common/guards/role.guard";
import type { RouteRecordRaw } from "vue-router";
import { GET_ROLES } from "@/common/utils/const";
import { HomeRoute } from "@/modules/clients/home/routers/index";
import
export const ClientRoute: RouteRecordRaw[] = [
  {
    path: "/client",
    name: "ClientLayout",
    component: () => import("@/layouts/ClientLayout.vue"), // You can replace with your actual layout or component
    beforeEnter: roleGuard, // Apply guard here if needed
    children: [
      ...HomeRoute
    ],
  }
];

import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/trendingBooks",
    name: "client-trendingBooks",
   
    component: () => import("../views/"),
    meta: { label: "cllient.home" },
  },
];

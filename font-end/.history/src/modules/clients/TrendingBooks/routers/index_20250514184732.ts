import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/trendingBooks",
    name: "client-trendingBooks",
   
    component: () => import("../views/TrendingBooks.vue"),
    meta: { label: "cllient.trendingBooks" },
  },
];

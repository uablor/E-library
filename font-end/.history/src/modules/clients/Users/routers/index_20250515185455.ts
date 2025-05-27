import type { RouteRecordRaw } from "vue-router";

export const UserRoute: RouteRecordRaw[] = [
  {
    path: "/client/trendingBooks",
    name: "client-trendingBooks",
   
    component: () => import("../views/User_Profile.vue"),
    meta: { label: "cllient.trendingBooks" },
  },
];

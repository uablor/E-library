import type { RouteRecordRaw } from "vue-router";

export const UserRoute: RouteRecordRaw[] = [
  {
    path: "/client/profile",
    name: "client-profile",
   
    component: () => import("../views/User_Profile.vue"),
    meta: { label: "cllient.trendingBooks" },
  },
];

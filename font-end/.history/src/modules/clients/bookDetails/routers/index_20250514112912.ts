import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/bookDetails",
    name: "client-home",
    component: () => import("../views/HomePage.vue"),
    meta: { label: "cllient.home" },
  },
];

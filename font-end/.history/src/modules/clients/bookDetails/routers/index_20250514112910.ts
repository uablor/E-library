import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/bookD",
    name: "client-home",
    component: () => import("../views/HomePage.vue"),
    meta: { label: "cllient.home" },
  },
];

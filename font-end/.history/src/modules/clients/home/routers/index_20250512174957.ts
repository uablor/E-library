import type { RouteRecordRaw } from "vue-router";

export const Home: RouteRecordRaw[] = [
  {
    path: "/client/home",
    name: "cllient-home",
    component: () => import("../views/HomePage.vue"),
    meta: { label: "cllient.home" },
  },
];

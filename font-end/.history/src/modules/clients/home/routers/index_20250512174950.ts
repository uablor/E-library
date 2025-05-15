import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/home",
    name: "cllient-home",
    component: () => import("../views/HomePage.vue"),
    meta: { label: "cimport { HomeRoute } from '@/modules/clients/home/routers';
llient.home" },
  },
];

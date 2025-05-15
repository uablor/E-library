import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/bookDetails",
    name: "client-bookDetails",
    component: () => import("../views/"),
    meta: { label: "cllient.home" },
  },
];

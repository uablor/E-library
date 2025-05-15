import type { RouteRecordRaw } from "vue-router";

export const HomeRoute: RouteRecordRaw[] = [
  {
    path: "/client/bookDetails",
    name: "client-bookDetails",
    component: () => import("../views/BookDetails.vue"),
    meta: { label: "cllient.bookDetails" },
  },
];

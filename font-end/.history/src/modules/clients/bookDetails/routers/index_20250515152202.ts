import type { RouteRecordRaw } from "vue-router";

export const BookDetailsRoute: RouteRecordRaw[] = [
  {
    path: "/client/bookDetails",
    name: "client-bookDetails",
    component: () => import("../views/BookDetails.vue"),
    meta: { label: "cllient.bookDetails" },
  },
];
export const BookFilesRoute: RouteRecordRaw[] = [
  {
    path: "/client/bookFiles",
    name: "client-bookFiles",
    component: () => import("../views/BookFile.vue"),
    meta: { label: "cllient." },
  },
];
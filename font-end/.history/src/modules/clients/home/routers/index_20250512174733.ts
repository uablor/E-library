import type { RouteRecordRaw } from "vue-router";

export const authRoute: RouteRecordRaw[] = [
  {
    path: "/client/login",
    name: "login",
    component: () => import("../views/HomePage.vue"),
    meta: { label: "ເຂົ້າລະບົບ" },
  },
];

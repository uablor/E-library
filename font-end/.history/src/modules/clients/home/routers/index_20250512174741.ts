import type { RouteRecordRaw } from "vue-router";

export const authRoute: RouteRecordRaw[] = [
  {
    path: "/client/home",
    name: "home",
    component: () => import("../views/HomePage.vue"),
    meta: { label: "ເຂົ້າລະບົບ" },
  },
];

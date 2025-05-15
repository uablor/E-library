import type { RouteRecordRaw } from "vue-router";

export const authRoute: RouteRecordRaw[] = [
  {
    path: "/admin/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { label: "ເຂົ້າລະບົບ" },
  },
];

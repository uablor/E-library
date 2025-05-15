import type { RouteRecordRaw } from "vue-router";

export const authRoute: RouteRecordRaw[] = [
  {
    path: "/admin/login",
    name: "login",
    component: () => import("../e"),
    meta: { label: "ເຂົ້າລະບົບ" },
  },
];

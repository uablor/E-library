import type { RouteRecordRaw } from "vue-router";

export const authRoute: RouteRecordRaw[] = [
  {
    path: "/admin/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { label: "ເຂົ້າລະບົບ" },
  },
];
export const ClientRouteRegister: RouteRecordRaw[] = [
  {
    path: "/client/register",
    name: "register",
    component: () => import("../views/"),
    meta: { label: "ເຂົ້າລະບົບ" },
  },
];
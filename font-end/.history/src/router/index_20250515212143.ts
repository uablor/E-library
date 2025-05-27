
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@/common/guards/auth.guard";
import { GET_ROLES } from "@/common/utils/const";
import { AdminRoute } from "./router-admin";
import { ClientRoute } from "./router-client";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name:"admin",
      // component: () => import("../components/layouts/AppLayout.vue"),
      children: [
        ...AdminRoute,
      ],
      meta: {
        // requiredRoles: [GET_ROLES.SUPER_ADMIN, GET_ROLES.ADMIN, GET_ROLES.USER],
      },
    },
    // ...authRoute,
    ...ClientRoute,
    
  ],
});

// authGuard(router);

export default router;
const routes = [
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },

  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true, // Add a meta field to indicate that this route requires authentication
    },
    children: [
      { path: "", component: () => import("pages/DashboardPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

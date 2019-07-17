import { AuthLayout, DefaultLayout } from "@/components/layouts";

export const publicRoute = [
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },
  // {
  //   path: "/auth",
  //   component: AuthLayout,
  //   meta: { title: "Login" },
  //   redirect: "/auth/login",
  //   hidden: true,
  //   children: [
  //     {
  //       path: "login",
  //       name: "login",
  //       meta: { title: "Login" },
  //       component: () =>
  //         import(/* webpackChunkName: "login" */ "@/views/auth/login.vue")
  //     }
  //   ]
  // },
  {
    path: "/callback",
    name: "callback",
    component: () =>
      import("@/views/auth/Callback.vue")
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () =>
      import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () =>
      import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  }
];

export const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "", requiresAuth: true },
    redirect: "/dashboard",
    children: [
      {
        path: "/users",
        name: "Users",
        meta: {
          title: "Users",
          icon: "supervisor_account",
          requiresAuth: true
        },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/Users.vue")
      },

      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () =>
          import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      },

      {
        path: "/",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "routes" */ `@/views/Dashboard.vue`),
        meta: { title: "Dashboard", icon: "dashboard", requiresAuth: true }
      },
      {
        path: "/deals",
        name: "Deals",
        component: () =>
          import(/* webpackChunkName: "routes" */ `@/views/DealView.vue`),
        meta: { title: "Deals", icon: "description", requiresAuth: true }
      },
      {
        path: "/deals/add",
        component: () =>
          import(/* webpackChunkName: "routes" */ `@/views/Deals.vue`),
        meta: { title: "Add a Deal", requiresAuth: true }
      },
      {
        path: "/solutions",
        name: "Solutions",
        component: () =>
          import(/* webpackChunkName: "routes" */ `@/views/DailyData.vue`),
        meta: {
          title: "Solutions",
          icon: "thumb_up",
          requiresAuth: true
        }
      }
    ]
  }
];

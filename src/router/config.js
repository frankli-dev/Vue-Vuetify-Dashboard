import { AuthLayout, DefaultLayout } from "@/components/layouts";

export const publicRoute = [
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },
  {
    path: "/auth",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
      }
    ]
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
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/users",
    children: [
      {
        path: "/users",
        name: "Users",
        meta: { title: "Users", group: "apps", icon: "assignment_ind" },
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },

      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () =>
          import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      },

      {
        path: "/deals",
        name: "Deals",
        component: () =>
          import(/* webpackChunkName: "routes" */ `@/views/DailyData.vue`),
        meta: { title: "Deals", icon: "assignment" }
      },
      {
        path: "/solutions",
        name: "Solutions",
        component: () =>
          import(/* webpackChunkName: "routes" */ `@/views/DailyData.vue`),
        meta: { title: "Solutions", icon: "assignment_turned_in" }
      }
    ]
  }
];

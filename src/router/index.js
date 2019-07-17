import Vue from "vue";
import store from "../store/";
import Router from "vue-router";
import { publicRoute, protectedRoute } from "./config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import auth from "../auth/authService";
const routes = publicRoute.concat(protectedRoute);

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth.isAuthenticated()) {
       return next();
    }
  }

  if (to.path === "/callback")
  {
    return next();
  }
  
  auth.login({ target: to.fullPath });

});

router.afterEach(() => {
  NProgress.done();
});

export default router;

import Vue from "vue";
import store from "../store/";
import Router from "vue-router";
import { publicRoute, protectedRoute } from "./config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const routes = publicRoute.concat(protectedRoute);

Vue.use(Router);
const router = new Router({
  mode: "history",
  linkActiveClass: "active",
  routes: routes
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(store.getters["app/isLoggedIn"]);
    if (store.getters["app/isLoggedIn"]) {
      next();
      return;
    }
    next("/auth/login");
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

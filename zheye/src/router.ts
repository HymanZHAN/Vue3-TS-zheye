import { createRouter, createWebHistory } from "vue-router";

import { store } from "@/store";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import ColumnDetail from "./pages/ColumnDetail.vue";
import CreatePost from "./pages/CreatePost.vue";

const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        redirectsIfLoggedIn: true,
      },
    },
    {
      path: "/column/:id",
      name: "ColumnDetail",
      component: ColumnDetail,
    },
    {
      path: "/post/create",
      name: "CreatePost",
      component: CreatePost,
      meta: {
        requiresLogin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresLogin && !store.state.user.isLoggedIn) {
    next({ name: "Login" });
  } else if (to.meta.redirectsIfLoggedIn && store.state.user.isLoggedIn) {
    next({ name: "Home" });
  } else {
    next();
  }
});

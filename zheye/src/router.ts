import { createRouter, createWebHistory } from "vue-router";

import { store } from "@/store";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
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
      path: "/register",
      name: "Register",
      component: Register,
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
  const { user, token } = store.state;
  const { requiredLogin, redirectsIfLoggedIn } = to.meta;

  if (!user.isLoggedIn) {
    if (token) {
      store
        .dispatch("fetchCurrentUser")
        .then(() => {
          if (redirectsIfLoggedIn) {
            next("/");
          } else {
            next();
          }
        })
        .catch((e) => {
          console.error(e);
          localStorage.removeItem("token");
          next("/login");
        });
    } else {
      if (requiredLogin) {
        next("/login");
      } else {
        next();
      }
    }
  } else {
    if (redirectsIfLoggedIn) {
      next("/");
    } else {
      next();
    }
  }
});

import { createRouter, createWebHistory } from "vue-router";

import { store } from "@/store";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import ColumnDetail from "./pages/ColumnDetail.vue";
import CreatePost from "./pages/CreatePost.vue";
import PostDetail from "./pages/PostDetail.vue";

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
      path: "/columns/:id",
      name: "ColumnDetail",
      component: ColumnDetail,
    },
    {
      path: `/columns/my-column`,
      name: "MyColumnDetail",
      component: ColumnDetail,
      props: {
        isMyColumn: true,
      },
    },
    {
      path: "/post/create",
      name: "CreatePost",
      component: CreatePost,
      meta: {
        requiresLogin: true,
      },
    },
    {
      path: "/post/edit",
      name: "EditPost",
      component: CreatePost,
      meta: {
        requiresLogin: true,
      },
    },
    {
      path: "/posts/:id",
      name: "PostDetail",
      component: PostDetail,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requiresLogin, redirectsIfLoggedIn } = to.meta;

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
      if (requiresLogin) {
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

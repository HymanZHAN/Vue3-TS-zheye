import { createStore } from "vuex";
import {
  GlobalDataProps,
  GlobalErrorProps,
  PostProps,
  TokenProps,
} from "./types";
import {
  deleteAndCommit,
  getAndCommit,
  patchAndCommit,
  postAndCommit,
} from "./helpers";

export const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem("token") || "",
    loading: false,
    columns: [],
    posts: [],
    post: null,
    user: {
      email: "",
      isLoggedIn: false,
    },
    myColumnId: "",
    error: {
      status: false,
    },
  },

  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => c._id === id);
    },
    getPostsByColumnId: (state) => (columnId: string) => {
      return state.posts.filter((p) => p.column === columnId);
    },
  },

  mutations: {
    login(state, data) {
      const { token } = data;
      state.token = token;
    },
    logout(state) {
      state.token = "";
      state.user = { email: "", isLoggedIn: false };
      localStorage.removeItem("token");
    },
    setCurrentUser(state, data) {
      state.user = { isLoggedIn: true, ...data };
      state.myColumnId = state.user.column || "";
    },
    createPost(state, newPost: PostProps) {
      state.posts.push(newPost);
    },
    setPosts(state, data) {
      state.posts = data.list;
    },
    setPost(state, data) {
      state.post = data;
    },
    updatePost(state, data) {
      state.post = data;
      state.posts = state.posts.map((p) => {
        if (p._id === data._id) {
          return data;
        } else {
          return p;
        }
      });
    },
    deletePost(state, deletedPostId) {
      state.post = null;
      state.posts = state.posts.filter((p) => p._id !== deletedPostId);
    },
    setColumns(state, data) {
      state.columns = data.list;
    },
    setColumn(state, data) {
      state.columns = [data];
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
  },

  actions: {
    async fetchCurrentUser({ commit }) {
      return getAndCommit("user/current", "setCurrentUser", commit);
    },

    async fetchColumns({ commit }) {
      await getAndCommit("columns", "setColumns", commit);
    },

    async fetchColumn({ commit }, columnId) {
      await getAndCommit(`columns/${columnId}`, "setColumn", commit);
    },

    async createPost({ commit }, payload) {
      return await postAndCommit<PostProps>(
        "posts",
        "createPost",
        commit,
        payload,
      );
    },

    async fetchPosts({ commit }, columnId) {
      await getAndCommit(`columns/${columnId}/posts`, "setPosts", commit);
    },

    async fetchPost({ commit }, postId) {
      const result = await getAndCommit(`posts/${postId}`, "setPost", commit);
      return result.data;
    },

    async updatePost({ commit }, { postId, payload }) {
      try {
        const result = await patchAndCommit(
          `posts/${postId}`,
          "updatePost",
          commit,
          payload,
        );
        return result.data;
      } catch (error) {
        console.error(error);
      }
    },

    async deletePost({ commit }, postId) {
      try {
        const result = await deleteAndCommit<PostProps>(
          `posts/${postId}`,
          "deletePost",
          commit,
          postId,
        );
        return result;
      } catch (error) {
        console.error(error);
      }
    },

    async login({ commit }, payload) {
      try {
        const result = await postAndCommit<TokenProps>(
          "user/login",
          "login",
          commit,
          payload,
        );
        const token = result.data.token;
        localStorage.setItem("token", token);
      } catch (error) {
        console.log("login error:", error);
      }
    },

    async loginAndFetchCurrentUser({ state, dispatch }, payload) {
      await dispatch("login", payload);
      if (!state.error.status) {
        await dispatch("fetchCurrentUser");
      }
    },

    logout({ commit }) {
      commit("logout");
    },
  },
});

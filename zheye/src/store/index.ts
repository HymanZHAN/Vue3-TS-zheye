import { Commit, createStore } from "vuex";
import { api } from "../services/base";
import {
  GlobalDataProps,
  GlobalErrorProps,
  PostProps,
  Resp,
  TokenProps,
} from "./types";

const getAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
) => {
  const result = await api.get(url).json<Resp<T>>();
  commit(mutation, result.data);
  return result;
};

const postAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
  payload: unknown,
) => {
  const result = await api.post(url, { json: payload }).json<Resp<T>>();
  commit(mutation, result.data);
  return result;
};

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

    async fetchPosts({ commit }, columnId) {
      await getAndCommit(`columns/${columnId}/posts`, "setPosts", commit);
    },

    async fetchPost({ commit }, postId) {
      await getAndCommit(`posts/${postId}`, "setPost", commit);
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

    async createPost({ commit }, payload) {
      return await postAndCommit<PostProps>(
        "posts",
        "createPost",
        commit,
        payload,
      );
    },

    async loginAndFetchCurrentUser({ state, dispatch }, payload) {
      await dispatch("login", payload);
      if (!state.error.status) {
        await dispatch("fetchCurrentUser");
      }
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      commit("logout");
    },
  },
});

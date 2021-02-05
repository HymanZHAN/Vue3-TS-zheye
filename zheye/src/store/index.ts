import { Commit, createStore } from "vuex";
import { api, getAuthApi } from "../services/base";
import {
  GlobalDataProps,
  GlobalErrorProps,
  PostProps,
  Resp,
  TokenProps,
} from "./types";

let authApi = api;

const getAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
) => {
  const result = await authApi.get(url).json<Resp<T>>();
  commit(mutation, result.data);
};

const postAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
  payload: unknown,
) => {
  const result = await authApi.post(url, { json: payload }).json<Resp<T>>();
  commit(mutation, result.data);
  return result;
};

export const store = createStore<GlobalDataProps>({
  state: {
    token: localStorage.getItem("token") || "",
    loading: false,
    columns: [],
    posts: [],
    user: {
      email: "",
      isLoggedIn: false,
    },
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
      state.user = { email: "", isLoggedIn: false };
      state.token = "";
      authApi = api;
    },
    setCurrentUser(state, data) {
      state.user = { isLoggedIn: true, ...data };
    },
    createPost(state, newPost: PostProps) {
      state.posts.push(newPost);
    },
    setPosts(state, data) {
      state.posts = data.list;
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
    async fetchColumns({ commit }) {
      await getAndCommit("columns", "setColumns", commit);
    },

    async fetchColumn({ commit }, columnId) {
      await getAndCommit(`columns/${columnId}`, "setColumn", commit);
    },

    async fetchPosts({ commit }, columnId) {
      await getAndCommit(`columns/${columnId}/posts`, "setPosts", commit);
    },

    async fetchCurrentUser({ commit }) {
      getAndCommit("user/current", "setCurrentUser", commit);
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
        authApi = getAuthApi(token);
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
      localStorage.removeItem("token");
      commit("logout");
    },
  },
});

import { Commit, createStore } from "vuex";
import api from "../services/base";
import { GlobalDataProps, PostProps, Resp, TokenProps } from "./types";

const getAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
) => {
  const result = await api.get(url).json<Resp<T>>();
  commit(mutation, result.data);
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
    token: "",
    loading: false,
    columns: [],
    posts: [],
    user: {
      columnId: "asdfasdf",
      isLoggedIn: false,
      name: "xzhan",
      id: 1,
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
      state.token = data.token;
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

    async login({ commit }, payload) {
      return await postAndCommit<TokenProps>(
        "user/login",
        "login",
        commit,
        payload,
      );
    },
  },
});

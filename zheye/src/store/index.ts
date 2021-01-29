import { Commit, createStore } from "vuex";
import api from "../services/base";
import { GlobalDataProps, PostProps, Resp } from "./types";

const getAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
) => {
  const result = await api.get(url).json<Resp<T>>();
  commit(mutation, result.data);
};

export const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: {
      columnId: "asdfasdf",
      isLoggedIn: true,
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
    login(state) {
      state.user = { ...state.user, isLoggedIn: true, name: "xzhan" };
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
  },
});

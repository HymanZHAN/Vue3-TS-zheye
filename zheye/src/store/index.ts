import { createStore } from "vuex";
import api from "../services/base";
import {
  ColumnProps,
  GlobalDataProps,
  ListData,
  PostProps,
  Resp,
} from "./types";

export const store = createStore<GlobalDataProps>({
  state: {
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
    setPosts(state, posts) {
      state.posts = posts;
    },
    setColumns(state, columns) {
      state.columns = columns;
    },
    setColumn(state, column) {
      state.columns = [column];
    },
  },
  actions: {
    async fetchColumns({ commit }) {
      const columns = await api
        .get("columns")
        .json<Resp<ListData<ColumnProps>>>();
      commit("setColumns", columns.data.list);
    },

    async fetchColumn({ commit }, columnId) {
      const column = await api
        .get(`columns/${columnId}`)
        .json<Resp<ColumnProps>>();
      commit("setColumn", column.data);
    },

    async fetchPosts({ commit }, columnId) {
      const column = await api
        .get(`columns/${columnId}/posts`)
        .json<Resp<ListData<PostProps>>>();
      commit("setPosts", column.data.list);
    },
  },
});

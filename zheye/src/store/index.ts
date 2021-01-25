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
      columnId: 1,
      isLoggedIn: true,
      name: "xzhan",
      id: 1,
    },
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c._id === String(id));
    },
    getPostsByColumnId: (state) => (columnId: number) => {
      return state.posts.filter((p) => p.columnId === columnId);
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
      console.log(columns);
      state.columns = columns;
    },
  },
  actions: {
    async fetchColumns({ commit }) {
      const columns = await api
        .get("columns")
        .json<Resp<ListData<ColumnProps>>>();
      commit("setColumns", columns.data.list);
    },
  },
});

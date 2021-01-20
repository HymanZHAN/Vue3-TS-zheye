import { createStore } from "vuex";
import { testColumn, testPosts, ColumnProps, PostProps } from "./testData";
interface UserProps {
  isLoggedIn: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export const store = createStore<GlobalDataProps>({
  state: {
    columns: testColumn,
    posts: testPosts,
    user: {
      columnId: 1,
      isLoggedIn: true,
      name: "xzhan",
      id: 1,
    },
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLoggedIn: true, name: "xzhan" };
    },
    createPost(state, newPost: PostProps) {
      state.posts.push(newPost);
    },
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id);
    },
    getPostsByColumnId: (state) => (columnId: number) => {
      return state.posts.filter((p) => p.columnId === columnId);
    },
  },
});

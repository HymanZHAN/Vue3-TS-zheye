export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  column: string;
  createdAt: string;
}

export interface UserProps {
  isLoggedIn: boolean;
  name?: string;
  id?: number;
  columnId?: string;
}

export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export interface ListData<T> {
  count: number;
  pageSize: number;
  currentPage: number;
  list: Array<T>;
}

export interface Resp<T> {
  code: number;
  msg: string;
  data: T;
}

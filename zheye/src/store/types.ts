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
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  column: string;
  createdAt?: string;
  author?: string;
}

export interface UserProps {
  _id?: string;
  avatar?: ImageProps;
  column?: string;
  email: string;
  description?: string;
  nickName?: string;
  isLoggedIn: boolean;
}

export interface TokenProps {
  token: string;
}

export interface GlobalDataProps {
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  post: PostProps | null;
  myColumnId: string;
  user: UserProps;
  error: GlobalErrorProps;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface ListData<T> {
  count: number;
  pageSize: number;
  currentPage: number;
  list: Array<T>;
}

export interface Resp<T = {}> {
  code: number;
  msg: string;
  data: T;
}

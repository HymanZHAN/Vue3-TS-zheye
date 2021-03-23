import { Commit } from "vuex";

import { api } from "../services/base";
import { Resp } from "./types";

export const getAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
) => {
  const result = await api.get(url).json<Resp<T>>();
  commit(mutation, result.data);
  return result;
};

export const postAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
  payload: unknown,
) => {
  const result = await api.post(url, { json: payload }).json<Resp<T>>();
  commit(mutation, result.data);
  return result;
};

export const patchAndCommit = async <T>(
  url: string,
  mutation: string,
  commit: Commit,
  payload: unknown,
) => {
  const result = await api.patch(url, { json: payload }).json<Resp<T>>();
  commit(mutation, result.data);
  return result;
};

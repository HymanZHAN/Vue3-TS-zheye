import { store } from "@/store";
import ky, { Options } from "ky";

const baseUrl = "http://apis.imooc.com/api";
const icode = "A0AEFEEC4B540896";
const icodeParam = `icode=${icode}`;

const addIcodeToPostBody = (request: Request, options: Options) => {
  if (request.method === "POST") {
    if (options.body instanceof FormData) {
      request.headers.delete("content-type");
      options.body.append("icode", icode);
      return new Request(request, options as RequestInit);
    } else if (options.json instanceof Object) {
      return new Request(request, {
        body: JSON.stringify({ ...options.json, icode }),
      });
    }
  }
};

const showLoading = (request: Request) => {
  if (request.method === "GET") {
    store.commit("setLoading", true);
  }
};
const hideLoading = () => {
  store.commit("setLoading", false);
};

const addAuthHeader = (token = "") => (request: Request) => {
  if (!token) {
    token = localStorage.getItem("token") || "";
  }
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const setError = async (req: Request, options: Options, resp: Response) => {
  if (!resp.ok) {
    const { error } = await resp.json();
    store.commit("setError", { status: true, message: error });
  }
  return resp;
};

const resetError = () => {
  store.commit("setError", { status: false, message: "" });
};

export const api = ky
  .create({ prefixUrl: baseUrl, searchParams: icodeParam, timeout: 30000 })
  .extend({
    hooks: {
      beforeRequest: [
        showLoading,
        resetError,
        addAuthHeader(),
        addIcodeToPostBody,
      ],
      afterResponse: [hideLoading, setError],
    },
  });

export const getAuthApi = (token: string) => {
  return api.extend({ hooks: { beforeRequest: [addAuthHeader(token)] } });
};

export const getApi = () => {
  return api.extend({});
};

export default api;

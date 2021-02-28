import { store } from "@/store";
import ky, { Options } from "ky";

const baseUrl = "http://apis.imooc.com/api";
const icode = "A0AEFEEC4B540896";
const icodeParam = `icode=${icode}`;

const addIcodeToPostBody = (request: Request, options: Options) => {
  if (request.method == "POST") {
    if (options.body instanceof FormData) {
      const newBody = options.body;
      newBody.append("icode", icode);
      return new Request(request, {
        body: newBody,
      });
    } else if (options.json instanceof Object) {
      return new Request(request, {
        body: JSON.stringify({ ...options.json, icode }),
      });
    }
  }
};

const showLoading = () => {
  store.commit("setLoading", true);
};
const hideLoading = () => {
  store.commit("setLoading", false);
};

const addAuthHeader = (token = localStorage.getItem("token")) => (
  request: Request,
) => {
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

export default api;

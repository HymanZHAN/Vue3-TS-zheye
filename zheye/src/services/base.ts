import { store } from "@/store";
import ky, { Options } from "ky";

const baseUrl = "http://apis.imooc.com/api";
const icode = "9D9FE119391E6C24";
const icodeParam = `icode=${icode}`;

const addIcodeToPostBody = async (request: Request, options: Options) => {
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

export const api = ky
  .create({ prefixUrl: baseUrl, searchParams: icodeParam })
  .extend({
    hooks: {
      beforeRequest: [addIcodeToPostBody, showLoading],
      afterResponse: [hideLoading],
    },
  });

export default api;

import ky from "ky";

const baseUrl = "http://apis.imooc.com/api";
const icode = "9D9FE119391E6C24";
const icodeParam = `icode=${icode}`;

const addIcodeToPostBody = async (request: Request) => {
  if (request.method == "POST") {
    if (request.body instanceof FormData) {
      const cloneReq = request.clone();
      const newBody = request.body;
      newBody.append("icode", icode);
      return new Request(cloneReq, { body: newBody });
    } else if (request.body instanceof String) {
      const cloneReq = request.clone();
      const jsonBody = await request.json();
      const newJsonBody = { ...jsonBody, icode: icode };
      return new Request(cloneReq, {
        body: JSON.stringify(newJsonBody),
      });
    }
  }
};

export const api = ky
  .create({ prefixUrl: baseUrl, searchParams: icodeParam })
  .extend({
    hooks: {
      beforeRequest: [addIcodeToPostBody],
    },
  });

export default api;

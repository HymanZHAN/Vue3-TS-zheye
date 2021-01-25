import { createApp } from "vue";

import { router } from "@/router";
import { store } from "@/store";
import App from "./App.vue";

const app = createApp(App);
app
  .use(router)
  .use(store)
  .mount("#app");

// import { api } from "@/services/base";

// api.get("columns").then((resp) => {
//   resp.json().then((result) => {
//     console.log(result.data.list);
//   });
// });

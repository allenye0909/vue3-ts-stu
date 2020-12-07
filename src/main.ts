/*
 * @Author: your name
 * @Date: 2020-11-17 11:35:15
 * @LastEditTime: 2020-12-07 09:38:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-stu\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

// ant-design-vue
import { setupAntd } from "@/setup/ant";
setupAntd(app);

import { setApp } from "@/setup/app";
setApp(app);

app
  .use(store)
  .use(router)
  .mount("#app");

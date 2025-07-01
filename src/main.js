import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";

import "tocas/dist/tocas.min.css"; // tocas css

import "./styles/style.css"; // 全域樣式
import "./styles/problem.css"; // 題目樣式

import Content from "./components/global/Content.vue"; // 內容區塊組件
import RanLink from "./components/global/RanLink.vue"; // ran 的超連結
import MakeProblem from "./components/problem/MakeProblem.vue"; // 標準的題目 vue 檔樣式
import MultiOption from "./components/problem/MultiOption.vue"; // 摺疊的多選題詳解
import Vl from "./components/problem/Vl.vue"; // 縮短 vatex 標籤長度的組件

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.component("Content", Content);
app.component("RanLink", RanLink);
app.component("MakeProblem", MakeProblem);
app.component("MultiOption", MultiOption);
app.component("vl", Vl);

app.mount("#app");

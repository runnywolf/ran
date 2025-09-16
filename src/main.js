import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import "./styles/main.css";

import Content from "./components/global/Content.vue"; // 內容區塊組件
import RanLink from "./components/global/RanLink.vue"; // ran 的超連結
import MakeProblem from "./components/problem/MakeProblem.vue"; // 標準的題目 vue 檔樣式
import MultiOption from "./components/problem/MultiOption.vue"; // 摺疊的多選題詳解
import vl from "./components/problem/Vl.vue"; // 顯示單個 katex 語法

const app = createApp(App);

app.use(router);

app.component("Content", Content);
app.component("RanLink", RanLink);
app.component("MakeProblem", MakeProblem);
app.component("MultiOption", MultiOption);
app.component("vl", vl);

app.mount("#app");

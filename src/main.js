import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import "./styles/main.css";

import Content from "./components/global/Content.vue"; // 內容區塊組件
import RanLink from "./components/global/RanLink.vue"; // ran 的超連結
import MakeProblem from "./components/problem-builder/MakeProblem.vue"; // 標準的題目 vue 檔樣式
import MultiOption from "./components/problem-builder/MultiOption.vue"; // 摺疊的多選題詳解
import vl from "./components/problem-builder/Vl.vue"; // 顯示單個 katex 語法
import vk from "./components/problem-builder/VueKatex.vue"; // 將 slot 內的 $...$ $$...$$ 解碼成

const app = createApp(App);

app.use(router);

app.component("Content", Content); // 預先載入一些常用組件
app.component("RanLink", RanLink);
app.component("MakeProblem", MakeProblem);
app.component("MultiOption", MultiOption);
app.component("vl", vl);
app.component("vk", vk);

app.mount("#app");

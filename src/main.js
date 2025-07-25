import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import "./styles/style.css"; // 全域樣式
import "./styles/problem.css"; // 題目樣式

import Content from "./components/global/Content.vue"; // 內容區塊組件
import RanLink from "./components/global/RanLink.vue"; // ran 的超連結
import MakeProblem from "./components/problem/MakeProblem.vue"; // 標準的題目 vue 檔樣式
import MakeProblemN from "./components/problem/MakeProblemN.vue"; // 標準的題目 vue 檔樣式
import MultiOption from "./components/problem/MultiOption.vue"; // 摺疊的多選題詳解
import vl from "./components/problem/Vl.vue"; // 顯示單個 katex 語法
import vk from "./components/problem/VueKatex.vue"; // 將 slot 內的 $...$ $$...$$ 解碼成

const app = createApp(App);

app.use(router);

app.component("Content", Content);
app.component("RanLink", RanLink);
app.component("MakeProblem", MakeProblem);
app.component("MakeProblemN", MakeProblemN);
app.component("MultiOption", MultiOption);
app.component("vl", vl);
app.component("vk", vk);

app.mount("#app");

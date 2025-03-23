import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";

import "./styles/style.css"; // 全域樣式
import "./styles/problem.css"; // 題目樣式
import Content from "./components/global/Content.vue"; // 內容區塊組件
import Vl from "./components/problem/Vl.vue"; // 縮短 vatex 標籤長度的組件
import OptionAnswer from "./components/problem/OptionAnswer.vue"; // 多選題中單個選項的折疊內容

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.component("Content", Content); // 內容區塊組件
app.component("vl", Vl);
app.component("OptionAnswer", OptionAnswer);

app.mount("#app");

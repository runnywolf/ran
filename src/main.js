import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./style.css";
import Content from "./components/global/Content.vue"; // 內容區塊組件
import Vl from "./components/global/Vl.vue"; // 縮短 vatex 標籤長度的組件

const app = createApp(App);
app.use(router);
app.component("Content", Content); // 內容區塊組件
app.component("vl", Vl);
app.mount("#app");

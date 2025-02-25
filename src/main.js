import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { VueLatex } from "vatex";
import './style.css';

const app = createApp(App);
app.use(router);
app.component("vue-latex", VueLatex); // latex 語法模組
app.mount('#app');

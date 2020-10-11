import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router/index";
import vuex from "./store/index";

createApp(App).use(router).use(vuex).mount("#app");

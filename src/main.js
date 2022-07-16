import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Ecosphere from "vue-ecosphere";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// import { io } from "socket.io-client";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Ecosphere);

app.config.globalProperties.$hspa = axios.create({
	baseURL: "http://localhost:4000/hspa/ui",
});
app.config.globalProperties.$time = dayjs;

console.log(import.meta.env);

app.mount("#app");

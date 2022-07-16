import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Ecosphere from "vue-ecosphere";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Ecosphere);

app.config.globalProperties.$hspa = axios.create({
	baseURL: import.meta.env.VITE_HSPA_UI_BASE_URL,
});
app.config.globalProperties.$time = dayjs;

app.mount("#app");

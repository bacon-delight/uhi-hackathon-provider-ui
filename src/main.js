import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Ecosphere from "vue-ecosphere";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Ecosphere);

app.mount("#app");

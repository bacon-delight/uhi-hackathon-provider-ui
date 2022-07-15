import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Ecosphere from "vue-ecosphere";
// import { io } from "socket.io-client";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Ecosphere);

// app.config.globalProperties.$socket = io(
// 	"ws://e880-35-187-228-237.ngrok.io:5000"
// );

app.mount("#app");

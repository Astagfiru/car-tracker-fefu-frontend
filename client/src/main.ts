import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from "vue-router";
import { router } from "./app/router";
import "@/shared/styles/index.scss";

import App from "./app/App.vue";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const i18n = createI18n({
  locale: "ru",
  messages: {
    ru: { hello: "Привет" },
    en: { hello: "Hello" },
  },
});
app.use(i18n);

app.use(router);

app.mount("#app");

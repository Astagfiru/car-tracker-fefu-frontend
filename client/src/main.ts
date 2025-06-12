import { createApp, onMounted } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { router } from "./app/router";
import "@/shared/styles/index.scss";
import { createVuetify } from 'vuetify'
import { ru } from 'vuetify/locale'
import { useGetAllClients } from "./entities/client";
import { usegetAllEmployee } from "./entities/employee";

import VueDatePicker from '@vuepic/vue-datepicker'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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

const { refetch } = useGetAllClients();

onMounted(() => {
  refetch();  
  usegetAllEmployee().refetch();
  console.log("Mounted and data fetched");
})

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    locale: 'ru',
    messages: { ru },
  },
  theme: {
    defaultTheme: 'light',
  }
})

app.use(i18n);

app.use(router);
app.use(vuetify);

app.mount("#app");


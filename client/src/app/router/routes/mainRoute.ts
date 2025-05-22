import { RouteRecordRaw } from "vue-router";
import { BASE_PAGE_PATH } from "../config";
import AppLayout from "@/app/layout/AppLayout.vue";

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: BASE_PAGE_PATH,
    component: AppLayout,
    redirect: { name: "dashboard" },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/DashboardPage/ui/DashboardLayout.vue"),
        meta: { title: "Главная" },
      },
      {
        path: "/clients",
        name: "clients",
        component: () =>
          import("@/pages/ClientControlPage/ui/ClienConrolPage.vue"),
        meta: { title: "Клиенты" },
      },
      {
        path: "clientForm",
        name: "clients-add",
        component: () => import("@/pages/AddUserPage/ui/AddNewClient.vue"),
        meta: { title: "Добавление нового клиента" },
      },
      {
        path: "/applications",
        name: "applications",
        component: () =>
          import("@/pages/ApplicationPage/ui/ApplicationPage.vue"),
        meta: { title: "Заявки" },
      },
       {
        path: "applicationForm",
        name: "application-add",
        component: () => import("@/pages/AddApplicationPage/ui/ApplicationForm.vue"),
        meta: { title: "Добавление новой заявки" },
      },
      {
        path: "/warehouse",
        name: "warehouse",
        component: () => import("@/pages/CarPage/ui/CarPage.vue"),
        meta: { title: "Склад" },
      },
    ],
  },
];

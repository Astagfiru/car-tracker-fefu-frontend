import { RouteRecordRaw } from "vue-router";
import AppLayout from "@/app/layout/AppLayout.vue";

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: "",
    component: AppLayout,
    redirect: { name: "dashboard" },
    meta: { title: "Главная" },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/DashboardPage/ui/DashboardLayout.vue"),
      },
      {
        path: "clients",
        name: "clients",
        component: () =>
          import("@/pages/ClientControlPage/ui/ClienConrolPage.vue"),
        meta: { title: "Клиенты" },
        children: [
          {
            path: "",
            name: "clients-table",
            component: () =>
              import("@/widgets/clientTable/ui/AllClientsTable.vue"),
            meta: { title: "Все клиенты" },
          },
          {
            path: "add",
            name: "clients-add",
            component: () => import("@/widgets/addUserForm/ui/AddClient.vue"),
            meta: { title: "Добавление нового клиента" },
          },
        ],
      },
      {
        path: "/applications",
        name: "applications",
        component: () =>
          import("@/pages/ApplicationPage/ui/ApplicationPage.vue"),
        meta: { title: "Заявки" },
        children: [
          {
            path: "add",
            name: "applications-add",
            component: () =>
              import("@/pages/AddApplicationPage/ui/ApplicationForm.vue"),
            meta: { title: "Добавление новой заявки" },
          },
        ],
      },
      {
        path: "/warehouse",
        name: "warehouse",
        component: () => import("@/pages/CarPage/ui/CarPage.vue"),
        meta: { title: "Склад" },
        children: [
          {
            path: "add",
            name: "warehouse-add",
            component: () => import("@/pages/CarPage/ui/CarPage.vue"),
            meta: { title: "Добавление нового товара" },
          },
        ],
      },
      {
        path: "/employeers",
        name: "employeers",
        component: () =>
          import("@/pages/EmployeersPage/ui/EmployeersMainPage.vue"),
        meta: { title: "Сотрудники" },
        children: [
           {
            path: "",
            name: "employeers-table",
            component: () =>
              import("@/widgets/employeerTable/ui/AllEmployeersTable.vue"),
            meta: { title: "Все сотрудники" },
          },
          {
            path: "add",
            name: "employeers-add",
            component: () =>
              import("@/widgets/addEmployeerForm/ui/AddEmployeer.vue"),
            meta: { title: "Добавление нового сотрудника" },
          },
        ],
      },
      {
        path: "/sell-car",
        name: "sell-car",
        component: () => import("@/pages/SellCar/SellCarPage.vue"),
        meta: { title: "Создание договора купли-продажи" },
      },
    ],
  },
];

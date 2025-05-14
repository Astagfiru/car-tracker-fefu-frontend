import { Component } from "vue";
import { Home, Client, Application, Car } from "@/shared";

export interface SideBar {
  id: string | number;
  label: string;
  icon?: Component;
  to: string;
  href?: string | null;
}

export const SIDE_BAR_ROWS: SideBar[] = [
  {
    id: 1,
    label: "Главная",
    icon: Home,
    to: "/",
  },
   {
    id: 2,
    label: "Клиенты",
    icon: Client,
    to: "/clients",
  },
  {
    id: 2,
    label: "Склад",
    icon: Car,
    to: "/warehouse",
  },
  {
    id: 3,
    label: "Заявки",
    icon: Application,
    to: "/applications",
  },
];

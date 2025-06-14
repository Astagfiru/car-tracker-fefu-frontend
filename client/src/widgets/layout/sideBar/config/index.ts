import { Component } from "vue";
import { Home, Client, ApplicationResponse, Car, Emploeey } from "@/shared";

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
    label: "Сотрудники",
    icon: Emploeey,
    to: "/Employeers",
  },
   {
    id: 3,
    label: "Клиенты",
    icon: Client,
    to: "/clients",
  },
  {
    id: 4,
    label: "Склад",
    icon: Car,
    to: "/warehouse",
  },
  {
    id: 5,
    label: "Заявки",
    icon: ApplicationResponse,
    to: "/applications",
  },
];

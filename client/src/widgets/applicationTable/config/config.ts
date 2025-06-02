import type { DataTableHeader } from "vuetify";

export const TABLE_HEADERS: DataTableHeader[] = [
  {
    title: "Клиент",
    key: "client_id",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Сотрудник",
    key: "employee_id",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Автомобиль",
    key: "car_id",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Дата",
    key: "application_date",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Статус",
    key: "status",
    headerProps: {
      class: "table__title",
    },
  },
];

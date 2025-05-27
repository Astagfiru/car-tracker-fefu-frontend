import type { DataTableHeader } from "vuetify";

export const TABLE_HEADERS: DataTableHeader[] = [
  {
    title: "Фамилия",
    key: "surname",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Имя",
    key: "name",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Отчество",
    key: "patronymic",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Телефон",
    key: "phone",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Email",
    key: "email",
    headerProps: {
      class: "table__title",
    },
  },
   {
    title: "Должность",
    key: "position",
    headerProps: {
      class: "table__title",
    },
  },
];

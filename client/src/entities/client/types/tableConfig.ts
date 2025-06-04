import type { DataTableHeader } from "vuetify";

export const TABLE_HEADERS: DataTableHeader[] = [
  {
    title: "#",
    key: "id",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Фамилия",
    key: "secondName",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Имя",
    key: "firstName",
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
    key: "phoneNumber",
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
];

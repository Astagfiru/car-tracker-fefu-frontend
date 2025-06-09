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
    key: "last_name",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Имя",
    key: "first_name",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Отчество",
    key: "middle_name",
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

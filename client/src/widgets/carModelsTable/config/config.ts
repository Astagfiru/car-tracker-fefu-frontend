import type { DataTableHeader } from "vuetify";

import { CarModelsTableView } from "./types";

export const TABLE_HEADERS: DataTableHeader[] = [
  {
    title: "Бренд",
    key: "brand",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Модель",
    key: "model",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Расход топлива",
    key: "fuelConsumption",
    headerProps: {
      class: "table__title",
    },
  },
  {
    title: "Год выпуска",
    key: "year",
    headerProps: {
      class: "table__title",
    },
  },
];

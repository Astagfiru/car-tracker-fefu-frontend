<template>
  <v-container>
    <v-data-table
      :items="tableItems || []"
      :headers="tableHeader"
      :items-per-page="itemsPerPage"
      :page.sync="currentPage"
      :server-items-length="totalItems"
      class="elevation-1 styled-table"
    >
      <template #top>
        <v-toolbar class="title">
          <v-toolbar-title class="text-h6">{{ tableTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <span class="mr-4 text-medium-emphasis">Всего записей: {{ tableItems?.length }}</span>
        </v-toolbar>
      </template>
    </v-data-table>
            <BaseViewForm :id="1" :config="testConfig" title="Окно" :model-value="true"/>

  </v-container>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
import { BaseViewForm } from "@/shared";
import type { DataTableHeader } from "vuetify/lib/components/VDataTable/types";


export interface Props<T> {
  tableHeader?: readonly DataTableHeader<T>[] | undefined;
  tableItems: T[] | null;
  tableTitle: string;
  totalItems?: number;
  itemsPerPage?: number;
}

const props = withDefaults(defineProps<Props<T>>(), {
  totalItems: 0,
  itemsPerPage: 5,
});

const currentPage = ref(1);

const testConfig = [
  {
    title: "Заголовок 1",
    value: "Значение 1"
  },
  {
    title: "Заголовок 2",
    value: "Значение 2"
  },
  {
    title: "Заголовок 3",
    value: "Значение 3"
  },
]

</script>
<style scoped>
.title {
background-color: #edf2ff !important;
  border-radius:  8px 8px 0 0 ;
  margin-bottom: 16px;
}

.styled-table >>> .v-data-table-header th {
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.styled-table >>> .v-data-table {
  border-radius: 5px;
  overflow: hidden;
}

.styled-table >>> .v-data-table__wrapper {
  background-color: #fff;
}

.styled-table >>> .v-data-table td {
  font-size: 14px;
  color: #333;
}
</style>

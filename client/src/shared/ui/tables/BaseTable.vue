<template>
  <v-data-table
    :items="tableItems || []"
    :headers="tableHeader"
    :items-per-page="itemsPerPage"
    :page.sync="currentPage"
    :server-items-length="totalItems"
    :loading="isLoading"
    class="elevation-1 styled-table"
    hide-default-footer
    height="350px"
    @click:row="handleRowClick"
    hover
  >
    <template #top>
      <v-toolbar class="title">
        <v-toolbar-title class="text-h6">{{ tableTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="mr-4 text-medium-emphasis">Всего записей: {{ tableItems?.length }}</span>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
import type { DataTableHeader } from "vuetify/lib/components/VDataTable/types";

export interface Props<T> {
  tableHeader?: readonly DataTableHeader<T>[] | undefined;
  tableItems: T[] | null;
  tableTitle: string;
  totalItems?: number;
  itemsPerPage: number;
  isLoading?: boolean;
}

const emit = defineEmits<{
  (e: "rowClick", item: T): void;
}>();

const props = withDefaults(defineProps<Props<T>>(), {
  totalItems: 0,
  itemsPerPage: 5,
});

const currentPage = ref(1);

const handleRowClick = (event: Event, item: T) => {
  emit("rowClick", item);
};
</script>

<style scoped>
.title {
  background-color: #ffffff !important;
  border-radius: 8px 8px 0 0;
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
  border: 1px solid #cfcfcf;
}

.styled-table >>> .v-data-table__wrapper {
  background-color: #fff;
}

.styled-table >>> .v-data-table td {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.styled-table >>> .v-data-table tr:hover {
  background-color: #f5f5f5 !important;
}

.v-data-table-header__sort-icon {
  svg {
    color: black;
  }
}
</style>

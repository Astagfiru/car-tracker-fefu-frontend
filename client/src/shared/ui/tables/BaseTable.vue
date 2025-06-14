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
        <span class="mr-4 text-medium-emphasis">Всего записей: {{ totalItems }}</span>
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

const handleRowClick = (event: Event, item: any) => {
  emit("rowClick", item.item ?? item);
};
</script>

<style lang="scss" scoped>
.title {
  background-color: #e8efff !important;  
}

.styled-table {
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #dddddd;
  margin: 0;
  margin-top: 15px;
}

:deep(.styled-table .v-data-table td) {
  padding: 14px 18px;
}
:deep(.styled-table .v-data-table__wrapper) {
  background-color: #fff;
}
:deep(.styled-table .v-data-table-header__sort-icon) {
  display: inline-flex;
  align-items: center;
  svg {
    color: #7c3aed !important;
    width: 18px;
    height: 18px;
    vertical-align: middle;
  }
}
</style>
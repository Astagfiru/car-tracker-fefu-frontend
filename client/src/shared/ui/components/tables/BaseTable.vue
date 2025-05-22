<template>
  <v-container>
    <v-data-table
      :items="tableItems || []"
      :headers="tableHeader"
      :items-per-page="itemsPerPage"
      :page.sync="currentPage"
      :server-items-length="totalItems"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar class="title">
          <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <span class="mr-4">Всего: {{ tableItems?.length }}</span>
        </v-toolbar>
      </template>
      
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
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
</script>

<style scoped>
.title {
  background-color: #ebf0fc;
  border-radius: 5px;
  padding: 8px 16px;
}
</style>

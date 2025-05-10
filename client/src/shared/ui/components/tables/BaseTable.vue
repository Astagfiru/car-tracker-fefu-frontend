<template>
  <v-container>
    <v-data-table
      :items="tableItems || []"
      class="elevation-1"
      :items-per-page="5"
    >
      <template #top>
        <v-toolbar class="title">
          <v-toolbar-title >{{ tableTitle }}</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>

</template>

<script setup lang="ts">
import { ClientTableView } from '@/widgets/clientTable/types/types';

interface TableData {
  tableHeader?: { text: string; value: string }[];
  tableItems: ClientTableView[] | null;
  tableTitle: string;
}

defineProps<TableData>()
</script>
<style scoped>
.title {
  background-color: #ebf0fc;
  border-radius: 5px;
}
</style>

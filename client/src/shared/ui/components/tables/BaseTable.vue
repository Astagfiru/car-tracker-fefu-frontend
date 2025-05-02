<template>
  <v-container>
    <v-data-table
      :headers="tableHeader"
      :items="tableItems || []"
      class="elevation-1"
      :items-per-page="5"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Клиенты</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { NewClient } from '@/entities/client';

interface TableData {
  tableHeader: { text: string; value: string }[];
  tableItems: NewClient[] | null;
}

const props = defineProps<TableData>()
</script>

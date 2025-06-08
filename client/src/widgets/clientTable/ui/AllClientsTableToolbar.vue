<template>
  <TableToolbar
    :add-redirect="redirect"
    v-model:search-string="searchString"
    :clear-function="clearFunction"
  />
</template>

<script setup lang="ts">
import { ref, watch, withDefaults } from "vue";
import { TableToolbar } from "@/shared";
import { useRouter } from "vue-router";
import { Client } from "@/entities/client";

const router = useRouter();

interface ToolbarProps {
  addButtonTitle?: string;
  addButtonDisables?: boolean;
  originClients: Client[] | null;
}

const { originClients } = withDefaults(defineProps<ToolbarProps>(), {
  addButtonDisables: false,
  addButtonTitle: "Добавить",
});

const filteredClients = defineModel<Client[]>('filteredClients', { required: true });

const searchString = ref<string>("");

const redirect = () => {
  router.push({ name: "clients-add" });
};

watch(searchString, (newVal) => {
  if (!newVal) {
    filteredClients.value = [...(originClients || [])];
  } else {
    const query = searchString.value.toLowerCase().trim();

    filteredClients.value = (originClients || []).filter((client: Client) => {
      return (
        client.secondName.toLowerCase().includes(query)
      );
    });
  }
});

const clearFunction = () => {
  searchString.value = "";
};
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.search-container {
  flex: 1;
}

.search-input {
  width: 100%;
}
</style>

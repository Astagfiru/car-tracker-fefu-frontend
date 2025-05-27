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
import { ClientType } from "@/entities/client";

const router = useRouter();

interface ToolbarProps {
  addButtonTitle?: string;
  addButtonDisables?: boolean;
  originClients: ClientType[] | null;
}

const { originClients } = withDefaults(defineProps<ToolbarProps>(), {
  addButtonDisables: false,
  addButtonTitle: "Добавить",
});

const clients = ref<ClientType[] | null>(null);

const originalClients = ref<ClientType[] | null>(originClients ? [...originClients] : []);

const searchString = ref<string>("");

const redirect = () => {
  router.push({ name: "clients-add" });
};

clients.value = [...(originalClients.value || [])];

watch(searchString, (newVal) => {
  if (!newVal) {
    clients.value = [...(originalClients.value || [])];
  } else {
    const query = newVal.toLowerCase().trim();
    clients.value = (originalClients.value || []).filter((client: ClientType) => {
      return (
        client.firstName.toLowerCase().includes(query) ||
        client.secondName.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.phoneNumber.replace(/\D/g, "").includes(query.replace(/\D/g, ""))
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

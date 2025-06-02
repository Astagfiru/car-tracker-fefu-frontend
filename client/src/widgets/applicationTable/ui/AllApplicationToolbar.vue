<template>
  <TableToolbar
    :add-redirect="redirect"
    v-model:search-string="searchString"
    :clear-function="clearFunction"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { TableToolbar } from "@/shared";
import { useRouter } from "vue-router";
import { ApplicationResponse } from "@/entities/application/types/applicationTypes";

const router = useRouter();

interface ToolbarProps {
  addButtonTitle?: string;
  addButtonDisables?: boolean;
  originApplications: ApplicationResponse[] | null;
}

const props = withDefaults(defineProps<ToolbarProps>(), {
  addButtonDisables: false,
  addButtonTitle: "Добавить",
});

const searchString = ref<string>("");

const redirect = () => {
  router.push({ name: "applications-add" });
};

watch(searchString, (newVal) => {
  // Реализуйте логику поиска при необходимости
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
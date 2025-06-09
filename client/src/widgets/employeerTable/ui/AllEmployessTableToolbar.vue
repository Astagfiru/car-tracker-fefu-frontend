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
import { EmployeeType } from "@/entities/employee";

const router = useRouter();

interface ToolbarProps {
  addButtonTitle?: string;
  addButtonDisables?: boolean;
  originEmployees: EmployeeType[] | null;
}

const { originEmployees } = withDefaults(defineProps<ToolbarProps>(), {
  addButtonDisables: false,
  addButtonTitle: "Добавить",
});

const filtererdEmployees = defineModel<EmployeeType[]>('filtererdEmployees')

const searchString = ref<string>("");

const redirect = () => {
  router.push({ name: "add-employeers" });
};

filtererdEmployees.value = [...(originEmployees || [])];

watch(searchString, (newVal) => {
  console.log(" Вызов watch", filtererdEmployees.value)
  if (!newVal) {
    filtererdEmployees.value = [...(originEmployees || [])];
  } else {
    const query = searchString.value.toLowerCase().trim();

    filtererdEmployees.value = (originEmployees || []).filter((employee: EmployeeType) => {
      return (
        employee.last_name.toLowerCase().includes(query)
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

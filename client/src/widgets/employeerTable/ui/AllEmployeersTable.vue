<template>
  <div class="container">
    <Title title="Сотрудники" />
    <div class="client-page">
      <div class="content">
        <div class="header">
          <AllEmployessTableToolBar v-model:filteredEmployees="filteredEmployees" :origin-employees="employees" />
        </div>
        <EmployeeTable :key="filteredEmployees.length" :tableItems="paginatedEmployees" table-title="Сотрудники"
          :is-loading="false" :total-items="employees?.length" :origin-employees="employees || []"/>
        <Pagination v-model:elements="paginatedEmployees" v-model:original-list="filteredEmployees"
          v-model:current-page="currentPage" :total-itemslenght="filteredEmployees.length" :items-per-page="5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EmployeeType } from "@/entities/employee";
import { ref, watch } from "vue";
import AllEmployessTableToolBar from './AllEmployessTableToolbar.vue';
import { Pagination } from "@/widgets";
import { EmployeerTable } from "../types/types";
import EmployeeTable from '@/entities/employee/ui/EmployeeTable.vue';
import { useEmployeeStore } from "@/entities/employee";
import { Title } from "@/shared";
import { storeToRefs } from "pinia";

const employeeStore = useEmployeeStore();
const { employees } = storeToRefs(employeeStore)

const currentPage = ref<number>(1);
const filteredEmployees = ref<EmployeeType[]>(employees.value || []);

const paginatedEmployees = ref<EmployeerTable[]>([]);

watch(employees, (employee) => {
  if (employee) {
    filteredEmployees.value = [...employee];
  }
}, { immediate: true });

</script>

<style scoped lang="scss">
.client-page {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.content {
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}

.btn {
  margin-left: 17px;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>

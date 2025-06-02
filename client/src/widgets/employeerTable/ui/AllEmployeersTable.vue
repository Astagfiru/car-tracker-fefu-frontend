<template>
  <div class="client-page">
    <div class="header">
      <TableToolbar
        :add-redirect="redirect"
      />
    </div>
    <BaseTable
      :key="employees?.length"
      :tableHeader="TABLE_HEADERS"
      :tableItems="employees"
      table-title="Сотрудники"
    />
    <Pagination v-model:elements="employees" :items-per-page="5" :current-page="1" ref="pagination" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { BaseTable } from "@/shared";
import { TABLE_HEADERS } from "../types/config";
import { EmployeeForm } from "@/entities/employee/types/employeeTypes";
import { useEmployeeStore } from "@/entities/employee";
import { useGetAllEmployeers } from "@/entities/employee";
import { TableToolbar } from "@/shared";
import { Pagination } from "@/widgets";
import { EmployeerTable } from "../types/types";

const router = useRouter();

const employeerStore = useEmployeeStore()
const { employees } = storeToRefs(employeerStore);
const { saveAllEmployees } = employeerStore

const redirect = () => {
  router.push({ name: "add-employeers" });
};

const getAllEmployeers = async () => {
  try {
    const fetchedEmployeers = await useGetAllEmployeers();
    console.log(fetchedEmployeers)
    if (fetchedEmployeers) {
      saveAllEmployees(fetchedEmployeers);
    }
  } catch (error) {
    throw error;
  }
};

watch(() => employees, getAllEmployeers);

onMounted(() => {
  getAllEmployeers();
});

</script>

<style scoped lang="scss">
.client-page {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 80%;
  box-sizing: border-box;
  margin-top: 30px;
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
</style>

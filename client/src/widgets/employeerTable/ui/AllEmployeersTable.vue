<template>
  <div class="client-page">
    <div class="header">
      <AllEmployessTableToolBar
        v-model:filteredEmployees="filteredEmployees"
        :origin-employees="employeeResponse"
      />
    </div>
    <EmployeeTable
      :key="filteredEmployees.length"
      :tableItems="paginatedEmployees"
      table-title="Сотрудники"
      :is-loading="isLoading"
      :total-items="employeeResponse?.length"
    />
    <Pagination 
    v-model:elements="paginatedEmployees"
    v-model:original-list="filteredEmployees"
    v-model:current-page="currentPage"
    :total-itemslenght="filteredEmployees.length"
     :items-per-page="5" />
  </div>
</template>

<script setup lang="ts">
import { EmployeeType } from "@/entities/employee";
import { usegetAllEmployee } from "@/entities/employee";
import{ref, watch} from "vue";
import AllEmployessTableToolBar from './AllEmployessTableToolbar.vue';
import { Pagination } from "@/widgets";
import { EmployeerTable } from "../types/types";
import EmployeeTable from '@/entities/employee/ui/employeeTable.vue';
import { is } from "date-fns/locale";

const {employeeResponse, isLoading} = usegetAllEmployee();

const currentPage = ref<number>(1);
const filteredEmployees = ref<EmployeeType[]>([]);

const paginatedEmployees = ref<EmployeerTable[]>([]);

watch(employeeResponse, (employee)=>{
  if(employee){
    filteredEmployees.value = employee;
    console.log('Filtered', filteredEmployees.value)
  }
}, {immediate:true});

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

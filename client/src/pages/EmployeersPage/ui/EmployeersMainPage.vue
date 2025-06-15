<template>
  <div class="client-page">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetAllEmployee } from "@/entities/employee";
import { useGetAllEmployeeRole } from "@/entities/employee/lib/composible/useGellAllEmployeesRole";
import { onMounted } from "vue";

onMounted(() => {
  useGetAllEmployee().refetch();
  useGetAllEmployeeRole().refetch();
})
</script>

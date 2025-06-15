<template>
  <div class="client-page">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetAllEmployee } from "@/entities/employee";
import { onMounted } from "vue";

const { refetch } = useGetAllEmployee();

onMounted(() => {
  refetch();
})
</script>

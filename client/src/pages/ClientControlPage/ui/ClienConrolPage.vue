<template>
  <div class="client-page">
     <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetAllClients } from "@/entities/client";
import { onMounted } from "vue";

const { refetch } = useGetAllClients();

onMounted(() => {
    refetch();
});
</script>

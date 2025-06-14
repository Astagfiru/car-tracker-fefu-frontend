<template>
  <div class="client-page">
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" v-if="Component" />
        <AllClientsTable v-else />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AllClientsTable } from "@/widgets";
import { useGetAllClients } from "@/entities/client";
import { onMounted } from "vue";

const { refetch } = useGetAllClients();

onMounted(() => {
    refetch();
});
</script>

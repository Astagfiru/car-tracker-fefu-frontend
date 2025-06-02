<template>
  <div class="client-page">
    <div class="header">
      <AllClientsTableToolbar :origin-applications="applications"/>
    </div>
    <BaseTable 
      :key="filteredClients.length" 
      :tableHeader="TABLE_HEADERS" 
      :tableItems="filteredClients"
      table-title="Клиенты" 
    />
    <Pagination 
      v-model:elements="filteredClients" 
      :items-per-page="5" 
      :current-page="1" 
      ref="pagination" 
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { BaseTable } from '@/shared';
import { Pagination } from "@/widgets";
import AllClientsTableToolbar from "./AllApplicationToolbar.vue"
import { useApplicationsStore } from '../../../entities/application/model/applicationStore';
import { useGetAllApplications } from '@/entities/application/api/useGetAllApplications';
import { TABLE_HEADERS } from "../config/config"
import { ApplicationResponse } from '@/entities/application/types/applicationTypes';

const applicationStore = useApplicationsStore();
const { applications } = storeToRefs(applicationStore);
const { saveAllApplications } = applicationStore;

const filteredClients = ref<ApplicationResponse[]>([]);

watch(applications, (newApplications) => {
  filteredClients.value = newApplications ? [...newApplications] : [];
}, { immediate: true });

const getAllApplications = async () => {
  try {
    const fetchedApplications = await useGetAllApplications();
    if (fetchedApplications) {
      saveAllApplications(fetchedApplications);
    }
  } catch (error) {
    console.error("Error fetching applications:", error);
  }
};

onMounted(() => {
  getAllApplications();
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
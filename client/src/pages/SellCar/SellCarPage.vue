<template>
  <div class="client-page">
    <Title title="Формирование формы купли продажи"/>
    <div class="content">
      <PurhaseAndSaleFormVue />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ButtonBack } from '@/shared';
import { Title, PurhaseAndSaleFormVue } from '@/shared';
import { useClientStore, useGetAllClients } from '@/entities/client';
import { useEmployeeStore } from '@/entities/employee';
import { useCarsStore, useGetAllCars } from '@/entities/car/lib/model/carStore';

const clientStore = useClientStore();
const employeeStore = useEmployeeStore();
const carStore = useCarsStore();

const fetchClients = async () => {
  try {
    console.log('Загружаем клиентов...');
    const { clientsResponse } = useGetAllClients();
    clientStore.saveAllClients(clientsResponse.value || []);
    console.log('Клиенты загружены:', clientStore.clients?.length);
  } catch (error) {
    console.error('Ошибка загрузки клиентов:', error);
  }
};

const fetchCars = async () => {
  try {
    console.log('Загружаем автомобили...');
    const { refetchCars } = useGetAllCars();
    await refetchCars();
    console.log('Автомобили загружены:', carStore.cars?.length);
    console.log('Первый автомобиль:', carStore.cars?.[0]);
  } catch (error) {
    console.error('Ошибка загрузки автомобилей:', error);
  }
};

onMounted(async () => {
  console.log('=== Начинаем загрузку данных ===');
  
  // Загружаем клиентов
  if (!clientStore.clients?.length) {
    await fetchClients();
  } else {
    console.log('Клиенты уже загружены:', clientStore.clients.length);
  }
  
  // Загружаем сотрудников
  if (!employeeStore.employees?.length) {
  } else {
    console.log('Сотрудники уже загружены:', employeeStore.employees.length);
  }
  
  // Загружаем автомобили
  if (!carStore.cars?.length) {
    await fetchCars();
  } else {
    console.log('Автомобили уже загружены:', carStore.cars.length);
  }
  
  console.log('=== Загрузка завершена ===');
});
</script>

<style scoped lang="scss">
.debug-info {
  border: 1px solid #ccc;
  border-radius: 4px;
  
  details {
    margin-top: 10px;
  }
  
  pre {
    background: white;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
  }
}
</style>
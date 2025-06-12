<template>
  <div class="client-page">
    <ButtonBack previousPageTitle="Главная" previousRouteName="clients"/>
    <Title title="Формирование формы купли продажи"/>
    
    <!-- Добавляем отладочную информацию -->
    <div class="debug-info" style="background: #f0f0f0; padding: 10px; margin: 10px 0;">
      <h4>Отладочная информация:</h4>
      <p>Клиенты загружены: {{ clientStore.clients?.length || 0 }}</p>
      <p>Сотрудники загружены: {{ employeeStore.employees?.length || 0 }}</p>
      <p>Автомобили загружены: {{ carStore.cars?.length || 0 }}</p>
      <p>Состояние загрузки: {{ carStore.isLoading }}</p>
      <p>Ошибка: {{ carStore.errorMessage }}</p>
      
      <details v-if="carStore.cars?.length">
        <summary>Данные автомобилей (первые 3)</summary>
        <pre>{{ JSON.stringify(carStore.cars.slice(0, 3), null, 2) }}</pre>
      </details>
    </div>
    
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
import { useEmployeeStore, useGetAllEmployeers } from '@/entities/employee';
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

const fetchEmployees = async () => {
  try {
    console.log('Загружаем сотрудников...');
    const employees = await useGetAllEmployeers();
    employeeStore.saveAllEmployees(employees || []);
    console.log('Сотрудники загружены:', employeeStore.employees?.length);
  } catch (error) {
    console.error('Ошибка загрузки сотрудников:', error);
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
    await fetchEmployees();
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
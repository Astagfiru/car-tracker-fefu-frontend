<template>
  <div class="client-page">
    <div class="header">
      <TableToolbar
        add-button-title="Добавить автомобиль"
        :add-redirect="openAddModal"
      />
    </div>
    
    <!-- Поиск -->
    <div class="search-section">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Поиск по модели или VIN..."
        class="search-input"
      />
    </div>
    
    <!-- Таблица -->
    <BaseTable
      :key="paginatedCars?.length"
      :tableHeader="TABLE_HEADERS"
      :tableItems="paginatedCars"
      table-title="Автомобили"
      :is-loading="isLoading"
      :items-per-page="itemsPerPage"
      @row-click="openDetailsModal"
    />
    
    <!-- Пагинация -->
    <div v-if="filteredCars.length > 0" class="pagination-section">
      <div class="pagination-info">
        Показано {{ startIndex + 1 }}-{{ endIndex }} из {{ filteredCars.length }} записей
      </div>
      
      <div class="pagination-controls">
        <select v-model="itemsPerPage" class="items-per-page">
          <option :value="10">10 на странице</option>
          <option :value="25">25 на странице</option>
          <option :value="50">50 на странице</option>
          <option :value="100">100 на странице</option>
        </select>
        
        <div class="pagination-buttons">
          <button 
            @click="previousPage" 
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            Предыдущая
          </button>
          
          <span class="pagination-current">
            Страница {{ currentPage }} из {{ totalPages }}
          </span>
          
          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            Следующая
          </button>
        </div>
      </div>
    </div>
    
    <!-- Модальные окна -->
    <CarDetailsModal
      :is-visible="isDetailsModalVisible"
      :car-id="selectedCarId"
      @close="closeDetailsModal"
      @deleted="handleCarDeleted"
    />
    
    <AddCarModal
      :is-visible="isAddModalVisible"
      @close="closeAddModal"
      @created="handleCarCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { BaseTable } from "@/shared";
import { TABLE_HEADERS, CarsTableView } from "../config/config";
import { useGetAllCars } from "@/entities/car/lib/composible/useGetAllCars";
import { TableToolbar } from "@/shared";
import { Car } from '../../../entities/car/types/carTypes';
import CarDetailsModal from './CarDetailsModal.vue';
import AddCarModal from './AddCarModal.vue';
import { useCarsStore } from "@/entities/car/lib/model/carStore";
import { storeToRefs } from "pinia";

const { isLoading, refetch } = useGetAllCars();
const carsStore = useCarsStore();
const { cars } = storeToRefs(carsStore);

onMounted(() => {
  refetch();
});

// Поиск
const searchTerm = ref("");

// Пагинация
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Модальные окна
const isDetailsModalVisible = ref(false);
const isAddModalVisible = ref(false);
const selectedCarId = ref<number | null>(null);

const mapCarsToTableView = (car: Car): CarsTableView & { id: number } => {
  return {
    id: car.id,
    model: car.model,
    inStock: car.inStock,
    mileage: car.mileage,
    price: car.price
  };
};

const mapClientsToTableView = (cars: Car[]): (CarsTableView & { id: number })[] => {
  return cars.map(mapCarsToTableView);
};

// Фильтрация автомобилей
const filteredCars = computed(() => {
  if (!cars.value) return [];
  
  if (!searchTerm.value) {
    return mapClientsToTableView(cars.value);
  }
  
  const filtered = carsStore.searchCars(searchTerm.value);
  return mapClientsToTableView(filtered);
});

// Пагинация
const totalPages = computed(() => {
  return Math.ceil(filteredCars.value.length / itemsPerPage.value);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + itemsPerPage.value, filteredCars.value.length);
});

const paginatedCars = computed(() => {
  return filteredCars.value.slice(startIndex.value, endIndex.value);
});

// Сброс страницы при изменении поиска или количества элементов
watch([searchTerm, itemsPerPage], () => {
  currentPage.value = 1;
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Модальные окна
const openDetailsModal = (carData: CarsTableView & { id: number }) => {
  selectedCarId.value = carData.id;
  isDetailsModalVisible.value = true;
};

const closeDetailsModal = () => {
  isDetailsModalVisible.value = false;
  selectedCarId.value = null;
};

const openAddModal = () => {
  isAddModalVisible.value = true;
};

const closeAddModal = () => {
  isAddModalVisible.value = false;
};

const handleCarDeleted = () => {
  refetch();
};

const handleCarCreated = () => {
  refetch();
};
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
  margin-bottom: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
}

.pagination-section {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.pagination-info {
  color: #666;
  font-size: 14px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.items-per-page {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
}

.pagination-current {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .pagination-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .pagination-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .pagination-buttons {
    justify-content: center;
  }
}
</style>
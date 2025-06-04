<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1"><</button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>

    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  itemsPerPage: number;
}

const props = defineProps<Props>();

const elements = defineModel<any[]>('elements');

const originalList = defineModel<any[]>('originalList');

const currentPage = defineModel<number>('currentPage');

const totalPages = computed(() => {
  return originalList?.value ? Math.ceil(originalList.value.length / props.itemsPerPage) : 1;
});

const updatePaginatedElements = () => {
  if(!currentPage.value) return
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;

  if(!originalList.value) return
  
  elements.value = originalList.value.slice(start, end);
};

watch([currentPage, originalList], () => {
  updatePaginatedElements();
}, { immediate: true });

const prevPage = () => {
    if(!currentPage.value) return

  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if(!currentPage.value) return

  if (currentPage.value < totalPages.value) currentPage.value++;
};

defineExpose({ currentPage, totalPages });
</script>
<style scoped>
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

button {
  padding: 0.4rem 0.7rem;
  border: 1px solid #dcd6e2;
  background: #ffffff;
  cursor: pointer;
  border-radius: 3px;
  transition: background 0.2s;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button.active {
  background: #95A4FB;
  color: white;
  border-color: #95A4FB;
}
</style>

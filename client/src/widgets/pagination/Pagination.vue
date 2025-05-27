<template>
  <div>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
    />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface PaginationProps {
  itemsPerPage: number
  currentPage: number
}

const props = defineProps<PaginationProps>()

const elements = defineModel<any>('elements')

const currentPage = ref(props.currentPage)

const totalPages = computed(() => {
  if (!elements?.value) return 1
  return Math.ceil(elements.value.length / props.itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return elements?.value?.slice(start, end) ?? []
})

watch(currentPage, (newVal) => {
})

defineExpose({ paginatedItems, currentPage, totalPages })
</script>

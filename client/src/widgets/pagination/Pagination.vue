<template>
<v-pagination :length="elements?.length"></v-pagination>
</template>
<script setup lang=ts>
interface PaginationProps {
    itemsPurePage: number;
    currentPage: number;
}

const elements = defineModel<[]>('elemets')

const returnElementsAfterPagination = () => {

}

defineProps<PaginationProps>()
</script>
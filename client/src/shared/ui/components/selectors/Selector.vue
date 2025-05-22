<template>
    <v-select :label="label" :items="items" :item-title="itemTitle" :item-value="itemValue" :multiple="multiple"
        :chips="chips" :clearable="clearable" v-model="selectedValue"></v-select>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: T | T[],
    items: T[],
    label?: string,
    itemTitle?: string | ((item: T) => string),
    itemValue?: string | ((item: T) => any),
    multiple?: boolean,
    chips?: boolean,
    clearable?: boolean
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: T | T[]): void
}>();

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
</script>
<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="form.brand" label="Бренд" required />
    <v-text-field v-model="form.model" label="Модель" required />
    <v-text-field v-model="form.fuelConsumption" label="Расход топлива" type="number" required />
    <v-text-field v-model="form.year" label="Год выпуска" type="number" required />
    <v-text-field v-model="form.seats" label="Кол-во мест" type="number" />
    <v-text-field v-model="form.doors" label="Кол-во дверей" type="number" />
    <v-textarea v-model="form.additionalInfo" label="Доп. информация" />
    <v-btn type="submit" color="primary">{{ isEdit ? 'Сохранить' : 'Добавить' }}</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';

const emit = defineEmits(['submit']);

const props = defineProps({
  initial: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});

const form = ref({
  brand: '',
  model: '',
  fuelConsumption: '',
  year: '',
  seats: '',
  doors: '',
  additionalInfo: '',
});

watch(() => props.initial, (val) => {
  if (val) {
    form.value = { ...val };
  }
}, { immediate: true });

function onSubmit() {
  emit('submit', { ...form.value });
}
</script>

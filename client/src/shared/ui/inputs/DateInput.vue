<template>
  <v-date-picker
    v-model="model"
    :title="label"
    :disabled="disabled"
    :min="min"
    :max="max"
    :text-field-props="{
      label,
      placeholder,
      error: !!error,
      'error-messages': error,
      clearable: clearable,
      class: 'custom-date-picker-input'
    }"
    :display-format="displayFormat"
    @update:model-value="onUpdate"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string | null
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  min?: string
  max?: string
  clearable?: boolean
  displayFormat?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const model = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    model.value = newVal
  }
)

function onUpdate(value: string | null) {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.custom-date-picker-input .v-text-field__control {
  border: 1px solid #d1d5db !important;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.custom-date-picker-input.v-input--is-focused .v-text-field__control {
  border-color: #4a73cb !important;
  box-shadow: 0 0 0 4px #bed3ff;
}

.custom-date-picker-input.v-input--has-state.v-input--is-error .v-text-field__control {
  border-color: #ff4d57 !important;
  box-shadow: 0 0 0 4px #ffd1d5;
}
</style>

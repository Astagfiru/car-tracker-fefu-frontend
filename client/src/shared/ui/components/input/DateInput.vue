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
  
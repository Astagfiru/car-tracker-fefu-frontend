<template>
    <div class="base-input">
      <label v-if="label" :for="id" class="input-label">{{ label }}</label>
  
      <input
        :id="id"
        v-model="model"
        :type="type"
        :placeholder="placeholder || 'Enter your email'"
        :disabled="disabled"
        :aria-invalid="!!error"
        class="input-common"
        @blur="validateEmail"
        required
      />
  
      <p v-if="error" class="text-danger">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const model = defineModel<string>()
  const error = ref<string | null>(null)
  
  interface Props {
    label?: string
    placeholder?: string
    error?: string
    type?: string
    disabled?: boolean
    id?: string
  }
  
  defineProps<Props>()
  
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!model.value) {
      error.value = 'Неверный адрес';
    } else if (!emailRegex.test(model.value)) {
      error.value = 'Пожалуйста, введите корректный адрес';
    } else {
      error.value = null;
    }
  }
  </script>
  
  <style scoped>
  .base-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  
  .input-common {
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    outline: none;
  }
  
  .input-common:focus {
    border-color: #ab68e2;
    box-shadow: 0 0 4px #ab68e2;
  }
  
  .input-common:disabled {
    background-color: #f4f6f9;
    border-color: #e0e0e0;
    cursor: not-allowed;
  }
  
  .text-danger {
    font-size: 12px;
    color: #dc3545;
  }
  </style>
  
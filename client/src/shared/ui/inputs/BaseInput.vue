<template>
  <div class="base-input" :class="{ error: !!error }">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>

    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="!!error"
      :class="['input-common', { error: error }]"
      @blur="validate"
    />

    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<string>()

interface Props {
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  id?: string
}

defineProps<Props>()

const error = ref<string | null>(null)

function validate() {
  error.value = !model.value?.trim()
    ? 'Поле не может быть пустым'
    : null
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
  border-color: #4a73cb;
  box-shadow: 0 0 0 4px #bed3ff;
}

.input-common:disabled {
  background-color: #f4f6f9;
  border-color: #e0e0e0;
  cursor: not-allowed;
}

.input-common.error {
  border-color: #ff4d57;
  box-shadow: 0 0 0 4px #ffd1d5;
}

.text-danger {
  font-size: 12px;
  color: #dc3545;
}
</style>

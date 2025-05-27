<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="!!error"
      :class="['input-common', { error: error }]"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from '@/shared'

const model = defineModel<string>()

interface Props {
  label?: string
  placeholder?: string
  error?: string
  type?: string
  disabled?: boolean
  id?: string
}

withDefaults(defineProps<Props>(), {
    placeholder: "Введите строку для поиска"
})
</script>
<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-common {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  color: #333;
  background: transparent;
  outline: none;
}

.input-common:focus {
  box-shadow: inset 0 0 0 2px #ab68e2;
}

.search-button {
  border-left: 1px solid #d1d5db;
  height: 100%;
  border-radius: 0;
}

.text-danger {
  font-size: 12px;
  color: #dc3545;
}

.search-field >>> .v-input__control {
  border-color: #d1d5db !important;
  transition: border-color 0.3s ease;
}

.search-field >>> .v-input__control:hover {
  border-color: #4A73CB !important;
}

.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.input-common {
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
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

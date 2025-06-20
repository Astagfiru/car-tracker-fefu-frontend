<template>
  <div class="base-input">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <span class="search-icon">
        <SearchIcons />
      </span>
      <input
        :id="id"
        v-model="searchString"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error"
        :class="['input-common', { error: error }]"
      />
      <button
        v-if="searchString"
        type="button"
        aria-label="Очистить поиск"
        class="clear-button"
        @click="handleClear"
      >
        ×
      </button>
    </div>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { SearchIcons } from '@/shared'

const searchString = defineModel<string>()

interface Props {
  label?: string
  placeholder?: string
  error?: string
  type?: string
  disabled?: boolean
  id?: string
  clearFunction?: () => void
}

const {clearFunction} = withDefaults(defineProps<Props>(), {
  placeholder: "Введите строку для поиска",
  type: "text",
})

const handleClear = () => {
  if(clearFunction) clearFunction()
}
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: #b0b0b0;
  font-size: 1.2em;
  z-index: 2;
}

.input-common {
  width: 100%;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 8px 32px 8px 36px; /* увеличен отступ слева для иконки */
  margin-right: 50px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
  box-sizing: border-box;
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

.clear-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  color: #999;
  padding: 0;
  user-select: none;
  transition: color 0.2s ease;
  margin-right: 10px;
  transition: color 0.5s ease-in-out;
  font-size: 1.5em;
}

.clear-button:hover {
  color: #7767d3;
}

.text-danger {
  font-size: 12px;
  color: #dc3545;
}
</style>
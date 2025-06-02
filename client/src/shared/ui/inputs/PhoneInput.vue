<template>
  <div class="base-input" :class="{ error: !!errorMessage }">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>

    <input
      :id="id"
      ref="inputRef"
      v-model="formatted"
      type="tel"
      :placeholder="placeholder || '+7 (___) ___-__-__'"
      :disabled="disabled"
      class="input-common"
      @input="onInput"
      @blur="handleBlur"
    />

    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useField } from 'vee-validate'
import * as yup from 'yup'

interface Props {
  label?: string
  placeholder?: string
  disabled?: boolean
  id?: string
  name?: string
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const schema = yup
  .string()
  .required('Введите номер телефона')
  .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера')

const { value, errorMessage, handleBlur } = useField(
  () => props.name || 'phone',
  schema,
  { initialValue: props.modelValue }
)

watch(value, (val) => {
  if (val !== props.modelValue) {
    emit('update:modelValue', val)
  }
})

const inputRef = ref<HTMLInputElement | null>(null)

const formatted = computed({
  get() {
    return value.value
  },
  set(val: string) {
    value.value = formatPhone(val)
  }
})

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 11)

  let result = '+7'
  if (digits.length > 1) result += ' (' + digits.slice(1, 4)
  if (digits.length >= 4) result += ') ' + digits.slice(4, 7)
  if (digits.length >= 7) result += '-' + digits.slice(7, 9)
  if (digits.length >= 9) result += '-' + digits.slice(9, 11)

  return result
}


function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 11)
  formatted.value = raw
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

.base-input.error .input-common {
  border-color: #ff4d57;
  box-shadow: 0 0 0 4px #ffd1d5;
}

.text-danger {
  font-size: 12px;
  color: #dc3545;
}
</style>

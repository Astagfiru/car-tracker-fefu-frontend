<template>
  <v-dialog v-model="isOpen" max-width="600" max-height="800" transition="dialog-top-transition" @wheel.prevent>
    <v-card class="view__container" >
      <div class="view__header">
        <h1 class="title" aria-label="Заголовок страницы">{{ title }}</h1>
        <span class="data__current">{{ formatDateRuLocale(currentDate) }}</span>
      </div>
      <div class="view__body">
        <strong class="view__element">
          {{ fullName }}
        </strong>
        <div class="view__element">
          <strong> Номер телефона:</strong>
          {{ employee?.phone }}
        </div>
         <div class="view__element">
          <strong> Почта:</strong>
          {{ employee?.email }}
        </div>
        <div class="view__element">
          <strong> Должность:</strong>
          {{ employee.position }}
        </div>
        
      </div>
      <div class="view__footer">
          <ButtonCansel title="Закрыть" :onClick="close" />
          <ButtonDanger :disabled="false" @click="handleConfirm">
            <template #text>
              Удалить
          </template></ButtonDanger>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { formatDateRuLocale } from "@/shared"
import { ButtonDanger } from "@/shared"
import { ButtonCansel } from "@/shared"
import type { EmployeeType } from '@/entities/employee'

interface ViewProps {
  employeeData: EmployeeType;
  title: string;
  modelValue: boolean;
}

const props = defineProps<ViewProps>()
const emit = defineEmits(["update:modelValue", "confirm"])

const currentDate = new Date()
const isOpen = ref(props.modelValue)
const employee = ref<EmployeeType>(props.employeeData)

const fullName = computed(() => {
  if (!employee.value) return ''
  return `${employee.value.last_name} ${employee.value.first_name} ${employee.value.middle_name}`
})

watch(() => props.employeeData, (newData) => {
  employee.value = newData
})

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
  isOpen.value = false
}

const handleConfirm = () => {
  if (!employee.value) return
  emit("confirm", employee.value)
  close()
}
</script>
<style scoped lang="scss">
.view__container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
}

strong {
    font-weight: 500;
    font-size: 1.2em;
}

.view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .title {
    font-size: 24px;
    font-weight: 600;
  }

  .data__current {
    font-size: 14px;
    color: #888;
  }
}

.view__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;

  .view__body-container {
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 8px;

    .content {
      font-size: 16px;
    }
  }

  .empty {
    text-align: center;
    color: #aaa;
    font-style: italic;
  }
}

.view__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>

<template>
  <v-dialog v-model="isOpen" max-width="600" max-height="800" transition="dialog-top-transition" @wheel.prevent>
    <v-card class="view__container">
      <div class="view__header">
        <h1 class="title" aria-label="Заголовок страницы">{{ title }}</h1>
        <span class="data__current">{{ formatDateRuLocale(currentDate) }}</span>
      </div>
      <div class="view__body">
        <div class="view__row">
          <span class="user_name">{{ fullName }}</span>
        </div>
        <div class="view__row">
          <span class="label">Должность:</span>
          <span class="value">{{ employee?.position }}</span>
        </div>
        <div class="view__row">
          <span class="label">Номер телефона:</span>
          <span class="value">{{ employee?.phone }}</span>
        </div>
        <div class="view__row">
          <span class="label">Почта:</span>
          <span class="value">{{ employee?.email }}</span>
        </div>
      </div>
      <div class="view__footer">
        <ButtonCansel title="Закрыть" :onClick="close" />
        <ButtonDanger :disabled="false" @click="openDeleteDialog">
          <template #text>
            Удалить
          </template>
        </ButtonDanger>
      </div>
    </v-card>
  </v-dialog>
  <EmployeeDeleteConfirmForm
    :employee="employee"
    :model-value="isDeleteDialogOpen"
    @update:modelValue="isDeleteDialogOpen = $event"
    @delete="handleDelete"
  />
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { formatDateRuLocale } from "@/shared"
import { ButtonDanger } from "@/shared"
import { ButtonCansel } from "@/shared"
import type { EmployeeType } from '@/entities/employee'
import EmployeeDeleteConfirmForm from "./EmployeeDeleteConfirmForm.vue"

interface ViewProps {
  employeeData: EmployeeType | null;
  title: string;
  modelValue: boolean;
}

const props = defineProps<ViewProps>()
const emit = defineEmits(["update:modelValue", "confirm"])

const currentDate = new Date()
const isOpen = ref(props.modelValue)
const employee = ref<EmployeeType | null>(props.employeeData)
const isDeleteDialogOpen = ref(false)

const fullName = computed(() => {
  if (!employee.value) return ''
  return `${employee.value.last_name} ${employee.value.first_name} ${employee.value.middle_name}`
})

watch(() => props.employeeData, (newData) => {
  if(employee.value)
  employee.value = newData
})

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
  isOpen.value = false
}

const openDeleteDialog = () => {
  isDeleteDialogOpen.value = true
}

const handleDelete = (deletedClient: EmployeeType) => {
  emit("confirm", deletedClient)
  isDeleteDialogOpen.value = false
  close()
}
</script>
<style scoped lang="scss">
.view__container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #fff;
  border-radius: 20px;
}

strong {
  font-size: 1.2em;
  color: #5c5c5c;
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
  gap: 16px;
  margin-bottom: 24px;

  .view__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 8px 0;

    .label {
      flex: 0 0 180px;
      color: #888;
      font-weight: 500;
      text-align: left;
    }
    .user_name {
      color: #4E79D6;
      font-weight: 600;
      font-size: 1.3em;
    }
    .value {
      flex: 1 1 auto;
      text-align: right;
      color: #222;
      font-size: 1.1em;
      word-break: break-word;
    }
    .user_name {
      color: #4E79D6;
      font-weight: 600;
      font-size: 1.3em;
    }
  }
}

.view__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
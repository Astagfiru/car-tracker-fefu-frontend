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
          {{ client?.phoneNumber }}
        </div>
         <div class="view__element">
          <strong> Почта:</strong>
          {{ client?.email }}
        </div>
        <div class="view__element">
          <strong> Серия и номер паспорта:</strong>
          {{ client?.passportSeries }} {{ client?.passportNumber }}
        </div>
        <div class="view__element">
          <strong> Дата выдачи: </strong>
          {{ client?.dateOfIssue }}
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
import type { Client } from '@/entities/client'

interface ViewProps {
  clientData: Client;
  title: string;
  modelValue: boolean;
}

const props = defineProps<ViewProps>()
const emit = defineEmits(["update:modelValue", "confirm"])

const currentDate = new Date()
const isOpen = ref(props.modelValue)
const client = ref<Client>(props.clientData)

const fullName = computed(() => {
  if (!client.value) return ''
  return `${client.value.secondName} ${client.value.firstName} ${client.value.patronymic}`
})

watch(() => props.clientData, (newData) => {
  client.value = newData
})

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
  isOpen.value = false
}

const handleConfirm = () => {
  if (!client.value) return
  emit("confirm", client.value)
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

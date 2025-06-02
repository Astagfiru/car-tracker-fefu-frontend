<template>
  <v-dialog v-model="isOpen" max-width="800" max-height="800" transition="dialog-top-transition" @wheel.prevent>
    <v-card class="view__container" >
      <div class="view__header">
        <h1 class="title" aria-label="Заголовок страницы">{{ title }}</h1>
        <span class="data__current">{{ formatDateRuLocale(currentDate) }}</span>
      </div>

      <div class="view__body">
        <template v-if="config.length">
          <div v-for="(item, index) in config" :key="index" class="view__body-container">
            <div class="content">
              <strong>{{ item.title }}</strong>: {{ item.value }}
            </div>
          </div>
        </template>
        <p v-else class="empty">Нет данных для отображения</p>
      </div>

      <div class="view__footer">
        <ButtonCansel title="Назад" :onClick="close" />
        <ButtonConfirm :disabled="false" @click="handleConfirm">Изменить</ButtonConfirm>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { formatDateRuLocale } from "@/shared"
import { ButtonCansel, ButtonConfirm } from "@/shared"
import { ref, watch } from "vue"

export type ConfigTypes = {
  title: string
  value: string
}

interface ViewProps {
  id: number
  config: ConfigTypes[]
  title: string
  modelValue: boolean
}

const props = defineProps<ViewProps>()
const emit = defineEmits(["update:modelValue", "confirm"])

const currentDate = new Date()

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
  isOpen.value = false
}

const handleConfirm = () => {
  emit("confirm")
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

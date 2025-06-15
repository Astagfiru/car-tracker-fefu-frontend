<template>
  <v-dialog v-model="isOpen" :max-width="width" transition="dialog-top-transition" @wheel.prevent>
    <v-card class="modal__container">
      <div class="modal__header">
        <h1 class="modal__title">{{ title }}</h1>
        <Close @click="close" class="modal__close-btn" />
      </div>
      <div class="modal__body">
        <slot />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Close } from "@/shared";


interface Props {
  modelValue: boolean;
  title?: string;
  width?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Модальное окно",
  width: 500,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, val => isOpen.value = val);
watch(isOpen, val => emit("update:modelValue", val));

function close() {
  isOpen.value = false;
}
</script>

<style scoped lang="scss">
.modal__container {
  display: flex;
  flex-direction: column;
  padding: 0;
  background: #fff;
  border-radius: 20px;
  min-width: 320px;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 12px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal__title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.modal__close-btn {
  color: #888;
}

.modal__body {
  padding: 24px;
}
</style>
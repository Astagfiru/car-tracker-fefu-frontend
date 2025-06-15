<template>
  <div class="selector-trigger">
    <slot name="trigger">
      <v-btn color="primary" @click="isOpen = true">Выбрать</v-btn>
    </slot>
    <v-dialog v-model="isOpen" :max-width="width" max-height="700" transition="dialog-top-transition">
      <v-card class="selector__container">
        <div class="selector__header">
          <h1 class="title">{{ title }}</h1>
          <SearchInput v-model="search" placeholder="Поиск..." />
        </div>
        <div class="selector__body">
          <div
            v-for="item in filteredEntities"
            :key="itemKey(item)"
            class="selector__item"
            @click="select(item)"
            :class="{ selected: isSelected(item) }"
          >
            <slot name="item" :item="item">
              {{ itemLabel(item) }}
            </slot>
          </div>
          <div v-if="filteredEntities.length === 0" class="selector__empty">
            Ничего не найдено
          </div>
        </div>
        <div class="selector__footer">
          <ButtonCansel title="Отмена" :onClick="close" />
          <ButtonConfirm :disabled="!selected" @click="handleConfirm">
            <template #text>Выбрать</template>
          </ButtonConfirm>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import SearchInput from "@/shared/ui/inputs/SearchInput.vue";
import { ButtonCansel } from "@/shared";
import ButtonConfirm from "@/shared/ui/buttons/ButtonConfirm.vue";

interface Props<T> {
  modelValue?: boolean;
  title?: string;
  entities: T[];
  labelKey?: string;
  keyField?: string;
  width?: string | number;
}

const props = withDefaults(defineProps<Props<any>>(), {
  title: "Выбор",
  labelKey: "name",
  keyField: "id",
  width: 500,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "select", value: any): void;
}>();

const isOpen = ref(false);

if (props.modelValue !== undefined) {
  isOpen.value = props.modelValue;
  watch(() => props.modelValue, val => isOpen.value = val);
  watch(isOpen, val => emit("update:modelValue", val));
}

const search = ref("");
const selected = ref<any>(null);

const filteredEntities = computed(() => {
  if (!search.value) return props.entities;
  return props.entities.filter(item =>
    itemLabel(item).toLowerCase().includes(search.value.toLowerCase())
  );
});

function itemLabel(item: any) {
  return item[props.labelKey] ?? "";
}
function itemKey(item: any) {
  return item[props.keyField] ?? item.id ?? item.name;
}
function select(item: any) {
  selected.value = item;
}
function isSelected(item: any) {
  return selected.value && itemKey(selected.value) === itemKey(item);
}
function close() {
  isOpen.value = false;
}
function handleConfirm() {
  if (selected.value) {
    emit("select", selected.value);
    close();
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

.input-label {
    font-weight: 500;
    color: #333;
}

.input-common {
    --v-select-border-color: #d1d5db;
    --v-select-border-radius: 8px;
    --v-select-background: #fff;
}

.input-common.error {
    --v-select-border-color: #ff4d57;
}

.text-danger {
    font-size: 12px;
    color: #dc3545;
}
</style>

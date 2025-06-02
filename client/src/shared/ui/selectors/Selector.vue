<template>
    <div class="base-input" :class="{ error: !!error }">
        <label v-if="label" :for="id" class="input-label">{{ label }}</label>

        <v-select  density="compact" :menu-props="{ scrim: true, scrollStrategy: 'close' }" :id="id" v-model="model" :items="items" :item-title="itemTitle" :item-value="itemValue"
            :multiple="multiple" :chips="chips" :clearable="clearable" :aria-invalid="!!error" class="input-common"
            @blur="validate" />

        <p v-if="error" class="text-danger">{{ error }}</p>
    </div>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'

const model = defineModel<T | T[]>();

const props = defineProps<{
  items: T[];
  label?: string;
  placeholder?: string;
  itemTitle?: string | ((item: T) => string);
  itemValue?: string | ((item: T) => any);
  multiple?: boolean;
  chips?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  id?: string;
}>();

const error = ref<string | null>(null)

function validate() {
    const isEmpty = Array.isArray(model.value)
        ? model.value.length === 0
        : !model.value;

    error.value = isEmpty ? 'Поле не может быть пустым' : null;
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

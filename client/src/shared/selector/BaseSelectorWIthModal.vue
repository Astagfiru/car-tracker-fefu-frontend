<template>
    <div>
        <div
            class="selector-input"
            @click="isOpen = true"
            :class="{ disabled }"
            tabindex="0"
        >
            <label v-if="label" class="input-label">{{ label }}</label>
            <div class="selector-input__value" :class="{ placeholder: !selectedLabel }">
                {{ selectedLabel || placeholder }}
            </div>
            <span class="selector-input__arrow">&gt;</span>
        </div>
        <BaseModalWrapper v-model="isOpen" :title="title" :width="width">
            <div class="selector__header">
                <SearchInput v-model="search" placeholder="Введите строку" />
            </div>
            <div class="selector__body">
                <div v-for="item in filteredEntities" :key="itemKey(item)" class="selector__item" @click="select(item)"
                    :class="{ selected: isSelected(item) }">
                    <slot name="item" :item="item">
                        {{ itemLabel(item) }}
                    </slot>
                </div>
                <div v-if="filteredEntities.length === 0" class="selector__empty">
                    Ничего не найдено
                </div>
            </div>
            <div class="selector__footer">
                <ButtonCansel :title="'Отмена'" @click="close" />
                <ButtonConfirm color="primary" :disabled="!selected" @click="handleConfirm">
                    <template #text>Выбрать</template>
                </ButtonConfirm>
            </div>
        </BaseModalWrapper>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import BaseModalWrapper from "@/shared/modal/BaseModalWrapper.vue";
import SearchInput from "@/shared/ui/inputs/SearchInput.vue";
import { ButtonCansel } from "@/shared";
import { ButtonConfirm } from "@/shared";

interface Props<T> {
    title?: string;
    width?: string | number;
    entities: T[];
    labelKey?: string;
    keyField?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    modelValue?: any;
}

const props = withDefaults(defineProps<Props<any>>(), {
    title: "Выбор",
    width: 500,
    labelKey: "name",
    keyField: "id",
    placeholder: "Выберите...",
    disabled: false,
});

const emit = defineEmits<{
    (e: "select", value: any): void;
    (e: "update:modelValue", value: any): void;
}>();

const isOpen = ref(false);
const search = ref("");
const selected = ref<any>(props.modelValue ?? null);

watch(() => props.modelValue, (val) => {
    selected.value = val;
});

const filteredEntities = computed(() => {
    if (!search.value) return props.entities;
    return props.entities.filter(item =>
        itemLabel(item).toLowerCase().includes(search.value.toLowerCase())
    );
});

const selectedLabel = computed(() => {
    if (!selected.value) return "";
    const found = props.entities.find(
        (item) => itemKey(item) === itemKey(selected.value)
    );
    return found ? itemLabel(found) : "";
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
        emit("update:modelValue", selected.value);
        close();
    }
}
</script>

<style scoped lang="scss">
.selector-input {
    width: 100%;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 8px 12px;
    background: #fff;
    font-size: 16px;
    transition: border-color 0.3s;
    min-height: 40px;
    position: relative;
    margin-bottom: 16px;
}
.selector-input:hover,
.selector-input:focus-within {
    border-color: #4a73cb;
}
.input-label {
    margin-right: 8px;
    color: #888;
    font-size: 14px;
    min-width: 80px;
}
.selector-input__value {
    flex: 1 1 auto;
    color: #333;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.selector-input__value.placeholder {
    color: #aaa;
}
.selector-input__arrow {
    margin-left: 8px;
    color: #888;
    font-size: 18px;
    font-weight: bold;
}
.selector-input.disabled {
    pointer-events: none;
    opacity: 0.6;
}
.selector__header {
    margin-bottom: 16px;
}
.selector__body {
    max-height: 350px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
}
.selector__item {
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
        background: #f3f4f6;
    }

    &.selected {
        background: #e0e7ff;
        font-weight: 600;
        color: #4f46e5;
    }
}
.selector__empty {
    color: #aaa;
    text-align: center;
    padding: 24px 0;
}
.selector__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>
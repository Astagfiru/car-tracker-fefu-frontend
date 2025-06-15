<template>
    <v-dialog v-model="isOpen" max-width="600" max-height="800" transition="dialog-top-transition">
        <v-card class="view__container">
            <form @submit.prevent="handleSave">
                <div class="view__header">
                    <h1 class="title" aria-label="Заголовок страницы">{{ title }}</h1>
                    <span class="data__current">{{ formatDateRuLocale(currentDate) }}</span>
                </div>
                <div class="view__body">
                    <div>
                        <BaseInput v-model="form.last_name" label="Фамилия" class="mb-4" />
                        <BaseInput v-model="form.first_name" label="Имя"  class="mb-4" />
                        <BaseInput v-model="form.middle_name" label="Отчество" />
                    </div>
                    <div class="view__row">
                        <PhoneInput v-model="form.phone" label="Номер телефона" />
                    </div>
                    <div class="view__row">
                        <EmailInput v-model="form.email" label="Почта"/>
                    </div>
                    <div class="view__row">
                        <BaseInput v-model="form.position" label="Должность"/>
                    </div>
                </div>
                <div class="view__footer">
                    <ButtonCansel title="Отмена" :onClick="close" />
                    <ButtonConfirm type="submit" @click="">
                        <template #text>
                            Сохранить
                        </template>
                    </ButtonConfirm>
                </div>
            </form>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from "vue"
import { formatDateRuLocale } from "@/shared"
import { ButtonCansel } from "@/shared"
import BaseInput from "@/shared/ui/inputs/BaseInput.vue";
import PhoneInput from "@/shared/ui/inputs/PhoneInput.vue";
import EmailInput from "@/shared/ui/inputs/EmailInput.vue"
import ButtonConfirm from "@/shared/ui/buttons/ButtonConfirm.vue";
import { useUpdateEmployee } from "../lib/composible/useUpdateEmployee";
import type { EmployeeType } from '../types/employeeTypes';

interface EditProps {
    employeeData: EmployeeType | null;
    title: string;
    modelValue: boolean;
}

const props = defineProps<EditProps>()
const emit = defineEmits(["update:modelValue", "save", "delete"])

const currentDate = new Date()
const isOpen = ref(props.modelValue)

const form = reactive<EmployeeType>({
    id: props.employeeData?.id ?? 0,
    first_name: props.employeeData?.first_name ?? "",
    last_name: props.employeeData?.last_name ?? "",
    middle_name: props.employeeData?.middle_name ?? "",
    phone: props.employeeData?.phone ?? "",
    email: props.employeeData?.email ?? "",
    position: props.employeeData?.position ?? "",
    user_id: props.employeeData?.user_id ?? 0,
})

watch(() => props.employeeData, (newData) => {
    if (newData) {
        Object.assign(form, newData)
    }
})

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
    isOpen.value = false
}

const handleSave = async () => {
    const { updateEmployee, responseData } = useUpdateEmployee()

    if (!form.first_name || !form.last_name || !form.phone || !form.email) return

    await updateEmployee(form)

    if(responseData.value) {
    close()
    }   
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
        gap: 16px;
        align-items: center;

    }
}

.view__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>
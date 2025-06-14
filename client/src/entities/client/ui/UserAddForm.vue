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
                        <BaseInput v-model="form.secondName" label="Фамилия" dense outlined required class="mb-4" />
                        <BaseInput v-model="form.firstName" label="Имя" dense outlined required class="mb-4" />
                        <BaseInput v-model="form.patronymic" label="Отчество" dense outlined />
                    </div>
                    <div class="view__row">
                        <PhoneInput v-model="form.phoneNumber" label="Номер телефона" dense outlined required />
                    </div>
                    <div class="view__row">
                        <EmailInput v-model="form.email" label="Почта" dense outlined required />
                    </div>
                    <div class="view__row">
                        <BaseInput v-model="form.passportSeries" label="Серия паспорта" dense outlined required :length="4" />
                        <BaseInput v-model="form.passportNumber" label="Номер паспорта" dense outlined required :length="6" />
                    </div>
                    <div class="view__row">
                        <BaseInput v-model="form.dateOfIssue" label="Дата выдачи" dense outlined required type="date" />
                    </div>
                    <div class="view__row">
                        <BaseInput v-model="form.issuedBy" label="Кем выдан" dense outlined required />
                    </div>
                </div>
                <div class="view__footer">
                    <ButtonCansel title="Отмена" :onClick="close" />
                    <ButtonConfirm type="submit">
                        <template #text>
                            Добавить
                        </template>
                    </ButtonConfirm>
                </div>
            </form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue"
import { formatDateRuLocale } from "@/shared"
import { ButtonCansel } from "@/shared"
import BaseInput from "@/shared/ui/inputs/BaseInput.vue";
import PhoneInput from "@/shared/ui/inputs/PhoneInput.vue";
import EmailInput from "@/shared/ui/inputs/EmailInput.vue"
import ButtonConfirm from "@/shared/ui/buttons/ButtonConfirm.vue";
import { useAddClient } from "../lib/composible/useAddClient";
import type { Client } from '@/entities/client'

interface AddProps {
    title: string;
    modelValue: boolean;
}


const props = defineProps<AddProps>()
const emit = defineEmits(["update:modelValue", "save"])

const currentDate = new Date()
const isOpen = ref(props.modelValue)

const form = reactive<Client>({
    id: 0,
    firstName: "",
    secondName: "",
    patronymic: "",
    phoneNumber: "",
    email: "",
    passportSeries: "",
    passportNumber: "",
    dateOfIssue: "",
    issuedBy: "",
})

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
    isOpen.value = false
}

const { addClient, error, isLoading, responseData } = useAddClient(form)

const handleSave = async () => {
    if (!form.firstName || !form.secondName || !form.phoneNumber || !form.email) return

    await addClient()

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
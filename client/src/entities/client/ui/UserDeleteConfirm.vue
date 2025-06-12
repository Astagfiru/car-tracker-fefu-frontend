<template>
    <v-dialog v-model="isOpen" max-width="400" transition="dialog-top-transition">
        <v-card class="delete__container">
            <div class="delete__header">
                <h2 class="delete__title">Подтвердите удаление</h2>
            </div>
            <div class="delete__body">
                <p>Вы уверены, что хотите удалить пользователя <strong>{{ fullName }}</strong>?</p>
            </div>
            <div class="delete__footer">
                <ButtonCansel title="Отмена" :onClick="close" />
                <ButtonDanger :disabled="false" @click="handleDelete">
                    <template #text>
                        Удалить
                    </template>
                </ButtonDanger>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { ButtonDanger } from "@/shared"
import { ButtonCansel } from "@/shared"
import type { Client } from '@/entities/client'
import { useDeleteClient } from "../lib/composible/useDeleteClient"

const { deleteClient } = useDeleteClient()

interface DeleteProps {
    client: Client | null;
    modelValue: boolean;
}

const props = defineProps<DeleteProps>()
const emit = defineEmits(["update:modelValue", "delete"])

const isOpen = ref(props.modelValue)
const client = ref<Client | null>(props.client)

const fullName = computed(() => {
    if (!client.value) return ''
    return `${client.value.secondName} ${client.value.firstName} ${client.value.patronymic}`
})

watch(() => props.client, (newData) => {
    client.value = newData
})

watch(() => props.modelValue, val => isOpen.value = val)
watch(isOpen, val => emit("update:modelValue", val))

const close = () => {
    isOpen.value = false
}

const handleDelete = async () => {
    if (!client.value) return
    emit("delete", client.value)
    await deleteClient(client.value.id)
    close()
}
</script>

<style scoped lang="scss">
.delete__container {
    display: flex;
    flex-direction: column;
    padding: 24px;
    background: #fff;
    border-radius: 12px;
}

.delete__header {
    margin-bottom: 16px;

    .delete__title {
        font-size: 20px;
        font-weight: 600;
    }
}

.delete__body {
    margin-bottom: 24px;
    font-size: 16px;

    p {
        margin: 0;
    }
}

.delete__footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>
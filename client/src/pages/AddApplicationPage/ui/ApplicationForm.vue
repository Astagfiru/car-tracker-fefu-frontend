<template>
    <div>
        <Selector :items="clients" label="Выберите клиента"/>
    </div>
</template>
<script setup lang="ts">
import {  MailInput, BaseInput, PhoneInput} from '@/shared';
import type { ClientForm } from '@/entities/client';
import { Selector } from '@/shared';
import { useClientStore } from '@/entities/client';
import { storeToRefs } from 'pinia';

const clientStore = useClientStore()
const {clients} = storeToRefs(clientStore)

interface ClientFormProps {
    client: ClientForm;
}

defineProps<ClientFormProps>()

</script>

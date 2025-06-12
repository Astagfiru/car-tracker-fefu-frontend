<template>
    <div>
        <BaseInput label="Фамилия" v-model="client.secondName" placeholder="Фамилия" class="mb-3"/>
        <BaseInput label="Имя" v-model="client.firstName" placeholder="Имя" class="mb-3"/>
        <BaseInput label="Отчество" v-model="client.patronymic" placeholder="Отчество" class="mb-3"/>
        <PhoneInput label="Телефон" v-model="client.phoneNumber" placeholder="8-000-000-00-00" class="mb-3"/>
        <MailInput label="Email" v-model="client.email" placeholder="example@mail.ry" class="mb-3"/>
        <BaseInput label="Серия паспорта" v-model="client.passportSeries" placeholder="Серия" class="mb-3" :length="4"/>
        <BaseInput label="Номер паспорта" v-model="client.passportNumber" placeholder="Номер" class="mb-3" :length="6"/>
        <BaseInput label="Кем выдан" v-model="client.issuedBy" placeholder="Кем выдан" class="mb-3"/>
        <BaseInput label="Дата выдачи" v-model="client.dateOfIssue" type="date" />
    </div>
</template>
<script setup lang="ts">
import {  MailInput, BaseInput, PhoneInput} from '@/shared';
import type { ClientForm } from '@/entities/client';

interface ClientFormProps {
    client: ClientForm;
}

defineProps<ClientFormProps>()

</script>

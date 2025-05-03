<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClientStore } from '@/entities/client';
import { ButtonCansel, ButtonConfirm, MailInput, BaseInput, PhoneInput} from '@/shared';

const createClienStore = useClientStore()

const { newClient } = storeToRefs(createClienStore)

</script>
<template>
    <div>
        <!-- <BaseInput label="Фамилия" v-model="createClienStore.surname" placeholder="Фамилия" class="mb-3"/>
        <BaseInput label="Имя" v-model="createClienStore.name" placeholder="Имя" class="mb-3"/>
        <BaseInput label="Отчество" v-model="createClienStore.patronymic" placeholder="Отчество" class="mb-3"/>
        <PhoneInput label="Телефон" v-model="createClienStore.phoneNumber" placeholder="8-000-000-00-00" class="mb-3"/>
        <MailInput label="Email" v-model="createClienStore.email" placeholder="example@mail.ry" class="mb-3"/>
        <BaseInput label="Серия паспорта" v-model="createClienStore.passportSeries" placeholder="Серия" class="mb-3"/>
        <BaseInput label="Номер паспорта" v-model="createClienStore.passportNumber" placeholder="Номер" class="mb-3"/>
        <BaseInput label="Кем выдан" v-model="createClienStore.issuedBy" placeholder="Кем выдан" class="mb-3"/>
        <BaseInput label="Дата выдачи" v-model="createClienStore.dateOfIssue" type="date" /> -->
    </div>
</template>
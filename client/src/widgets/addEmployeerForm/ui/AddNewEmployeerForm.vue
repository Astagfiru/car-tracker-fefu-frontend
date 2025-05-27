<template>
    <div>
        <BaseInput label="Фамилия" v-model="employeer.surname" placeholder="Фамилия" class="mb-3"/>
        <BaseInput label="Имя" v-model="employeer.name" placeholder="Имя" class="mb-3"/>
        <BaseInput label="Отчество" v-model="employeer.patronomic" placeholder="Отчество" class="mb-3"/>
        <PhoneInput label="Телефон" v-model="employeer.phone" placeholder="8-000-000-00-00" class="mb-3"/>
        <MailInput label="Email" v-model="employeer.email" placeholder="example@mail.ry" class="mb-3"/>
        <Selector label="Должность" v-model:model-value="employeer.postion" :items="positions"/>
    </div>
</template>
<script setup lang="ts">
import {  MailInput, BaseInput, PhoneInput} from '@/shared';
import type { EmployeeForm, Positions } from '@/entities/employee';
import { Selector } from '@/shared';

const positions = ['position1', 'position2']

interface EmployeerFormProps {
    employeer: EmployeeForm;
}

defineProps<EmployeerFormProps>()

</script>

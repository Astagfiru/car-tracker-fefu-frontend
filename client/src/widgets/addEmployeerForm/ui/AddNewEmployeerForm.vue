<template>
    <div>
        <BaseInput label="Фамилия" v-model="employeer.last_name" placeholder="Фамилия" class="mb-3"/>
        <BaseInput label="Имя" v-model="employeer.first_name" placeholder="Имя" class="mb-3"/>
        <BaseInput label="Отчество" v-model="employeer.middle_name" placeholder="Отчество" class="mb-3"/>
        <PhoneInput label="Телефон" v-model="employeer.phone" placeholder="8-000-000-00-00" class="mb-3"/>
        <MailInput label="Email" v-model="employeer.email" placeholder="example@mail.ry" class="mb-3"/>
        <RoleSelector />
    </div>
</template>
<script setup lang="ts">
import {  MailInput, BaseInput, PhoneInput} from '@/shared';
import type { EmployeeForm } from '@/entities/employee';
import { Selector } from '@/shared';
import { BaseSelectorWIthModal } from '@/shared';
import { useEmployeeStore } from '@/entities/employee';
import { storeToRefs } from 'pinia';
import RoleSelector from '@/entities/employee/ui/selectors/RoleSelector.vue';

const employeeStore = useEmployeeStore();

const { roles } = storeToRefs(employeeStore);

interface EmployeerFormProps {
    employeer: EmployeeForm;
}

defineProps<EmployeerFormProps>()

</script>

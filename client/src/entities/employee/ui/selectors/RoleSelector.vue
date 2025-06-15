<template>
    <label  class="input-label">Выберите должность</label>
        <BaseSelectorWIthModal
            v-model="model.position"
            :entities="roles ?? []"
            title="Выберите должность"
            placeholder="Выберите должность" class="mt-3" />
</template>

<script setup lang="ts">
import { BaseSelectorWIthModal } from '@/shared';
import { useEmployeeStore } from '@/entities/employee';
import { storeToRefs } from 'pinia';
import type { EmployeeForm } from '@/entities/employee';

const employeeStore = useEmployeeStore();
const { roles } = storeToRefs(employeeStore);

const model = defineModel<EmployeeForm>({
  default: {
    position: '',
  },
});

</script>
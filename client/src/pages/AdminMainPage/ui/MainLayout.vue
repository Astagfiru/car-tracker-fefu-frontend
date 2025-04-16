<template>
  <div class="client-page">
    <div class="header">
      <h1>Управление клиентами</h1>
      <ButtonConfirm :onClick="redirect" title="Добавить клиента">
        <Plus />
      </ButtonConfirm>
    </div>

    <BaseTable :tableHeader="TABLE_HEADERS" :tableItems="clientsObj" />
  </div>
</template>
<script setup lang="ts">
import { BaseTable, ButtonConfirm, Plus } from '@/shared';
import { useRouter } from 'vue-router';
import { useClientStore } from '@/entities/client';
import { storeToRefs } from 'pinia';
import { TABLE_HEADERS } from '../types/tableConfig';

const router = useRouter();
const clientStore = useClientStore()

const { clients } = storeToRefs(clientStore)

const redirect = () => {
  router.push({ name: 'add-client' });
};

const clientsObj = [
  {
    surname: 'Иванов',
    name: 'Иван',
    patronymic: 'Иванович',
    phone: '+79123456789',
    email: 'ivanov@example.com',
  },
  {
    surname: 'Петрова',
    name: 'Мария',
    patronymic: 'Сергеевна',
    phone: '+79123456780',
    email: 'petrova@example.com',
  },
];
</script>

<style scoped lang="scss">
.client-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background-color: white;
  min-height: 100vh;
  width: 80%;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
}
</style>
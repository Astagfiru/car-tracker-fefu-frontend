<template>
  <div class="client-page">
    <div class="header">
      <h1>Управление клиентами</h1>
      <ButtonConfirm :onClick="redirect" title="Добавить клиента" :disabled="false">
        <Plus />
      </ButtonConfirm>
    </div>

    <!-- Использование key для принудительного обновления компонента -->
    <BaseTable :key="clients.length" :tableHeader="TABLE_HEADERS" :tableItems="clients" />
  </div>
</template>

<script setup lang="ts">
import { BaseTable, ButtonConfirm, Plus } from '@/shared';
import { useRouter } from 'vue-router';

import { storeToRefs } from 'pinia';
import { TABLE_HEADERS } from '../types/tableConfig';
import { useCreateClientStore } from '@/widgets/addUserForm';

const router = useRouter();
const clientStore = useCreateClientStore()

const { clients } = storeToRefs(clientStore)

const redirect = () => {
  router.push({ name: 'add-client' });
};
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

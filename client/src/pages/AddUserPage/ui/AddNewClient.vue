<script setup lang="ts">
import { ButtonCansel, ButtonConfirm } from '@/shared';
import { useRouter } from 'vue-router';
import { AddNewClientForm } from '@/widgets';
import { computed, ref, watch, nextTick } from 'vue';
import { useClientStore } from '@/entities/client';
import { storeToRefs } from 'pinia';

const router = useRouter();
const createClientStore = useClientStore();
const { newClient } = storeToRefs(createClientStore);

const errorMessage = ref('');

const previosStep = () => {
  router.back();
};

const nextStep = async () => {
  // errorMessage.value = '';

  // if (!disabledButton.value) {
  //   createClientStore.addClient(newClient.value);

  //   newClient.value.email = '';
  //   newClient.value.name = '';
  //   newClient.value.surname = '';
  //   newClient.value.patronymic = '';
  //   newClient.value.phoneNumber = '';
  //   newClient.value.passportSeries = '';
  //   newClient.value.passportNumber = '';
  //   newClient.value.issuedBy = '';
  //   newClient.value.dateOfIssue = '';

  //   router.push({ name: 'dashboard' }).then(() => {
  //     window.location.reload();
  //   });
  // }
};

const disabledButton = computed(() => {
  // return !(
  //   createClientStore.surname &&
  //   createClientStore.name &&
  //   createClientStore.patronymic &&
  //   createClientStore.phoneNumber &&
  //   createClientStore.email &&
  //   createClientStore.passportSeries &&
  //   createClientStore.passportNumber &&
  //   createClientStore.issuedBy &&
  //   createClientStore.dateOfIssue
  // );
});

// watch(() => newClient.value.email, () => {
//   if (errorMessage.value) {
//     errorMessage.value = '';
//   }
// });
</script>

<template>
  <div class="layout">
    <div class="content-box">
      <header class="page-header">
        <h1>Добавление нового клиента</h1>
        <h3 class="grey-lighten-5">Заполните личные данные клиента</h3>
      </header>

      <section class="form-content">
        <AddNewClientForm />
      </section>

      <section v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </section>
      <footer class="footer-actions">
        <ButtonCansel title="Отмена" :onClick="previosStep" />
        <ButtonConfirm title="Сохранить" :disabled="true" @click="nextStep" :class="{'dis' : disabledButton}"/>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">

.dis {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.layout {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;
  width: 50vw;
}

.error-message {
  color: #dc2626;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

.content-box {
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  border-radius: 12px;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 24px;

  h1 {
    margin: 0 0 8px;
    font-size: 28px;
    font-weight: 600;
  }

  h3 {
    margin: 0;
    font-size: 16px;
    color: #6b7280;
  }
}

.form-content {
  flex: 1;
}

.footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
}
</style>
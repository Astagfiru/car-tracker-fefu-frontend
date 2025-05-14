<script setup lang="ts">
import { ButtonCansel, ButtonConfirm } from "@/shared";
import { useRouter } from "vue-router";
import AddNewClientForm from "./AddNewClientForm.vue";
import { computed, ref, watch, nextTick, reactive } from "vue";
import { useClientStore } from "@/entities/client";
import { storeToRefs } from "pinia";
import { useAddClient, useGetAllClients } from "@/entities/client";

import { NewClient } from "../../../entities/client/types/clientTypes";

const router = useRouter();
const clientStore = useClientStore();

const { addClient, saveAllClients } = clientStore;

const errorMessage = ref("");

const previosStep = () => {
  router.back();
};

const requiredFields = [
  "firstName",
  "secondName",
  "patronymic",
  "phoneNumber",
  "passportNumber",
  "passportSeries",
  "email",
  "issuedBy",
  "dateOfIssue",
] as const;

const newClient: NewClient = reactive({
  firstName: "",
  secondName: "",
  patronymic: "",
  phoneNumber: "",
  passportNumber: "",
  passportSeries: "",
  issuedBy: "",
  dateOfIssue: "",
  email: "",
});

const nextStep = async () => {
  errorMessage.value = "";

  if (disabledButton.value) {
    return;
  }

  addNewClient(newClient)
  router.push({ name: 'clients'})
};

const addNewClient = async (client: NewClient) => {
  try {
    const fetchNewClient = await useAddClient(client);
    const fetchedClients = await useGetAllClients();

    if (fetchedClients) {
      saveAllClients(fetchedClients);
    }
  } catch (error) {
    throw error;
  }
};

const disabledButton = computed(() => {
  return !requiredFields.every((field) => Boolean(newClient[field]));
});
</script>

<template>
  <div class="layout">
    <div class="content-box">
      <header class="page-header">
        <h1>Добавление нового клиента</h1>
        <h3 class="grey-lighten-5">Заполните личные данные клиента</h3>
      </header>

      <section class="form-content">
        <AddNewClientForm :client="newClient" />
      </section>

      <section v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </section>
      <footer class="footer-actions">
        <ButtonCansel title="Отмена" :onClick="previosStep" />
        <ButtonConfirm
          title="Сохранить"
          :disabled="true"
          @click="nextStep"
          :class="{ dis: disabledButton }"
        />
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
  border: 1px solid #fecaca;
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

.content-box {
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

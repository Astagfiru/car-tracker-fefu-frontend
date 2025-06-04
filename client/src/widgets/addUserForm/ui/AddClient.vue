<script setup lang="ts">
import { ButtonCansel, ButtonConfirm } from "@/shared";
import { useRouter } from "vue-router";
import AddNewClientForm from "./AddNewClientForm.vue";
import { computed, ref, reactive } from "vue";
import { useClientStore } from "@/entities/client";
import { ClientForm } from "../../../entities/client/types/clientTypes";
import { ButtonText } from "@/shared";

const router = useRouter();
const clientStore = useClientStore();

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

let newClient = reactive<ClientForm>({
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

  try {
    clientStore.addClient({ ...newClient, id: Date.now() });

    newClient = {
      firstName: "",
      secondName: "",
      patronymic: "",
      phoneNumber: "",
      passportNumber: "",
      passportSeries: "",
      issuedBy: "",
      dateOfIssue: "",
      email: "",
    }

    router.push({ name: 'clients' });

  } catch (error) {
    errorMessage.value = "Ошибка при сохранении клиента";
    console.error(error);
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
        <ButtonText :disabled="disabledButton" @click="nextStep" :class="{ dis: disabledButton }">Сохранить</ButtonText>
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

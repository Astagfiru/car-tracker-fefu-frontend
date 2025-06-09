<script setup lang="ts">
import { ButtonCansel, ButtonConfirm } from "@/shared";
import { useRouter } from "vue-router";
import AddNewEmployeerForm from "./AddNewEmployeerForm.vue";
import { computed, ref, reactive } from "vue";
import { useEmployeeStore } from "@/entities/employee";
import { EmployeeForm } from "../../../entities/employee/types/employeeTypes";
import { ButtonText } from "@/shared";
const router = useRouter();
const employeeStore = useEmployeeStore();

const errorMessage = ref("");

const previosStep = () => {
  router.back();
};

const requiredFields = [
  "first_name",
  "last_name",
  "phone",
  "position"
] as const;

const newEmployee = reactive<EmployeeForm>({
  first_name: "",
  last_name: "",
  middle_name: "",
  phone: "",
  email: "",
  position: "manager", 
});

const nextStep = async () => {
  errorMessage.value = "";

  if (disabledButton.value) {
    return;
  }

  try {
    employeeStore.addEmployee({...newEmployee, id : Date.now()});

    router.push({ name: 'employees' });

  } catch (error) {
    errorMessage.value = "Ошибка при сохранении сотрудника";
    console.error(error);
  }
};

// Закомментированный API-запрос
/*
const addNewClient = async (client: ClientForm) => {
  try {
    await useAddClient(client);
    const fetchedClients = await useGetAllClients();
    if (fetchedClients) {
      clientStore.saveAllClients(fetchedClients);
    }
  } catch (error) {
    throw error;
  }
};
*/

const disabledButton = computed(() => {
  return !requiredFields.every((field) => Boolean(newEmployee[field]));
});
</script>

<template>
  <div class="layout">
    <div class="content-box">
      <header class="page-header">
        <h1>Добавление нового сотрудника</h1>
        <h3 class="grey-lighten-5">Заполните личные данные сотрудника</h3>
      </header>
      <section class="form-content">
        <AddNewEmployeerForm :employeer="newEmployee" />
      </section>
      <section v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </section>
      <footer class="footer-actions">
        <ButtonCansel title="Отмена" :onClick="previosStep" />
        <ButtonText
          :disabled="disabledButton"
          @click="nextStep"
          :class="{ dis: disabledButton }"
        >Сохранить</ButtonText>
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

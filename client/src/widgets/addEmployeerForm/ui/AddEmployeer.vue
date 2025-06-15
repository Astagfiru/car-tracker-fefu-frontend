<script setup lang="ts">
import { ButtonCansel, ButtonConfirm } from "@/shared";
import { useRouter } from "vue-router";
import AddNewEmployeerForm from "./AddNewEmployeerForm.vue";
import { computed, ref, reactive, watch } from "vue";
import { EmployeeForm } from "../../../entities/employee/types/employeeTypes";
import { ButtonText } from "@/shared";
import { useAddEmployee } from "@/entities/employee/lib/composible/useAddEmployee";

const router = useRouter();

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

let newEmployee = reactive<EmployeeForm>({
  first_name: "",
  last_name: "",
  middle_name: "",
  phone: "",
  email: "",
  position: "manager", 
  user_id: 41,
});

const { addEmployee } = useAddEmployee(newEmployee)

const nextStep = async () => {
  errorMessage.value = "";

  if (disabledButton.value) {
    return;
  }

  try {
    addEmployee()
    
    router.push({ name: 'employeers' });
  } catch (error) {
    errorMessage.value = "Ошибка при сохранении сотрудника";
    console.error(error);
  }
};

const disabledButton = computed(() => {
  return !requiredFields.every((field) => Boolean(newEmployee[field]));
});

watch(newEmployee, () => {
  console.log("Изменение сотрудника", newEmployee);
}
 , { deep: true }
);
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
  padding-bottom: 30px
}
</style>
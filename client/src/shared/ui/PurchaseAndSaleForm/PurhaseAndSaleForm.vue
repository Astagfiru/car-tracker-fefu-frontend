<template>
  <div class="purchase-sale-container">
    <!-- Форма заполнения -->
    <div v-if="!showSummary" class="contract-form">
      <h1 class="form-title">Заполните форму купли-продажи</h1>

      <form @submit.prevent="showSummaryForm" class="input-form">
        <section class="form-section">
          <BaseInput
            label="Населенный пункт"
            v-model:modelValue="newForm.city"
            required
            class="mb-2"
          />
          <BaseInput
            label="Дата договора"
            v-model:modelValue="newForm.date"
            required
            type="date"
            class="mb-2"
          />
        </section>

        <section class="form-section">
          <Selector
            label="Выберите покупателя"
            v-model:modelValue="newForm.buyerName"
            :items="clients ?? []"
            :item-title="(item: Client) => `${item.secondName} ${item.firstName} ${item.patronymic}`"
            item-value="id"
            required
          />
          <Selector
            label="Выберите продавца"
            v-model:modelValue="newForm.sellerName"
            :items="employees ?? []"
            :item-title="(item: EmployeeType) => `${item.last_name} ${item.first_name} ${item.middle_name || ''}`"
            item-value="id"
            required
          />
          <Selector
            label="Выберите авто"
            v-model:modelValue="newForm.vehicleModel"
            :items="safeCars"
            item-title="model"
            item-value="id"
            required
          />
        </section>

        <section class="form-section" v-if="selectedCarInfo">
          <h3>Данные автомобиля</h3>
          <div class="info-grid">
            <div><strong>VIN:</strong> {{ selectedCarInfo.vin }}</div>
            <div><strong>Модель:</strong> {{ selectedCarInfo.model }}</div>
          </div>
        </section>

        <section class="form-section">
          <BaseInput
            label="Комментарий от продавца"
            v-model:modelValue="newForm.sellerComment"
          />
          <BaseInput
            label="Цена автомобиля"
            v-model:modelValue="newForm.price"
            required
          />
        </section>

        <section class="form-section" v-if="sellerInfo">
          <h3>Платежная информация продавца</h3>
          <table class="info-table">
            <tr v-for="(value, key) in sellerInfo" :key="key">
              <td><strong>{{ key }}</strong></td>
              <td>{{ value }}</td>
            </tr>
          </table>
        </section>

        <section class="form-section" v-if="buyerInfo">
          <h3>Данные покупателя</h3>
          <table class="info-table">
            <tr v-for="(value, key) in buyerInfo" :key="key">
              <td><strong>{{ key }}</strong></td>
              <td>{{ value }}</td>
            </tr>
          </table>
        </section>

        <div class="action-buttons">
          <button type="submit" class="btn-primary">
            Просмотреть итоговую форму
          </button>
        </div>
      </form>
    </div>

    <!-- Итоговая форма -->
    <PurchaseSaleSummary
      v-if="showSummary"
      :form-data="newForm"
      @go-back="goBackToForm"

    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import {
  BaseInput,
  DateInput,
  Selector,
  ButtonConfirm,
  ButtonBack,
} from "@/shared";
import { useClientStore } from "@/entities/client";
import { storeToRefs } from "pinia";
import { useEmployeeStore } from "@/entities/employee";
import { useCarsStore } from "@/entities/car/lib/model/carStore";
import { EmployeeType } from "@/entities/employee/types/employeeTypes";
import { Car } from "@/entities/car";
import { Client } from "@/entities/client";
import PurchaseSaleSummary from './PurchaseSaleSummary.vue'; // Импортируем новый компонент

// Stores
const clientStore = useClientStore();
const employeeStore = useEmployeeStore();
const carStore = useCarsStore();

// State
const { clients } = storeToRefs(clientStore);
const { employees } = storeToRefs(employeeStore);
const { cars } = storeToRefs(carStore);

// Состояние отображения итоговой формы
const showSummary = ref(false);

// Добавляем computed для безопасного доступа к cars
const safeCars = computed(() => {
  const carsArray = cars.value || [];
  
  return carsArray.map(car => ({
    ...car,
    model: `Модель ID: ${car.id} | VIN: ${car.vin || 'Не указан'}`
  }));
});

// Form interface
interface NewForm {
  city: string;
  date: string;
  sellerName: EmployeeType | null;
  buyerName: Client | null;
  vehicleModel: Car | null;
  sellerComment: string;
  price: string;
  vin: string;
}

const newForm = reactive<NewForm>({
  city: "",
  date: "",
  sellerName: null,
  buyerName: null,
  vehicleModel: null,
  sellerComment: "",
  price: "",
  vin: "XTA21099765432101"
});

const selectedCarInfo = computed(() => {
  if (!newForm.vehicleModel) return null;
  return {
    vin: newForm.vin,
    model: newForm.vehicleModel.id,
  };
});

const sellerInfo = computed(() => {
  if (!newForm.sellerName) return null;
  return {
    country: "Россия",
    city: "Москва",
    address: "ул. Примерная, д. 1",
    inn: "770123456789",
    okpo: "12345678",
    bik: "044525123",
    phone: "+7 (999) 123-45-67"
  };
});

const buyerInfo = computed(() => {
  if (!newForm.buyerName) return null;
  return {
    phone: newForm.buyerName.phoneNumber,
    passportNumber: newForm.buyerName.passportNumber,
    passportSeries: newForm.buyerName.passportSeries,
    issueDate: newForm.buyerName.dateOfIssue,
    issuedBy: newForm.buyerName.issuedBy
  };
});

// Methods
const showSummaryForm = () => {
  showSummary.value = true;
};

const goBackToForm = () => {
  showSummary.value = false;
};


</script>

<style scoped lang="scss">
.purchase-sale-container {
  width: 100%;
  min-height: 100vh;
}

.contract-form {
  margin: 0 auto;
  padding: 2rem;
}

.form-title {
  color: #6b6b6b;
  margin-bottom: 2rem;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    margin-bottom: 1rem;
    color: #444;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;

  div {
    padding: 0.5rem;
  }
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  td {
    &:first-child {
      width: 40%;
      font-weight: 500;
    }
  }
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;

  .btn-primary {
    padding: 0.75rem 1.5rem;
    background-color: #4a73cb;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: #3a5bb0;
    }
  }
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>
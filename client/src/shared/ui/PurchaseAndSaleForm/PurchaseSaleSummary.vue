<template>
  <div class="summary-container">
    <div class="summary-header">
      <h1 class="summary-title">ДОГОВОР КУПЛИ-ПРОДАЖИ ТРАНСПОРТНОГО СРЕДСТВА</h1>
      <div class="contract-info">
        <div class="contract-location">г. {{ formData.city }}</div>
        <div class="contract-date">{{ formattedDate }}</div>
      </div>
    </div>

    <div class="summary-content">
      <!-- Вводная часть -->
      <section class="summary-section intro-section">
        <p class="intro-text">
          <span class="seller-name">{{ sellerFullName }}</span>, именуемый в дальнейшем "Продавец", 
          с одной стороны, и <span class="buyer-name">{{ buyerFullName }}</span>, именуемый в дальнейшем 
          "Покупатель", с другой стороны, заключили настоящий договор о нижеследующем:
        </p>
      </section>

      <!-- 1. Предмет договора -->
      <section class="summary-section">
        <h2 class="section-title">1. ПРЕДМЕТ ДОГОВОРА</h2>
        <div class="contract-text">
          <p>1.1. Продавец обязуется передать в собственность Покупателю транспортное средство:</p>
          <div class="vehicle-details-table">
            <table class="details-table">
              <tr>
                <td class="label-cell">Марка, модель:</td>
                <td class="value-cell">{{ vehicleDisplayName }}</td>
              </tr>
              <tr>
                <td class="label-cell">Идентификационный номер (VIN):</td>
                <td class="value-cell vin-cell">{{ formData.vin }}</td>
              </tr>
              <tr>
                <td class="label-cell">Год выпуска:</td>
                <td class="value-cell">{{ vehicleDetails?.year || 'Не указан' }}</td>
              </tr>
              <tr>
                <td class="label-cell">Цвет:</td>
                <td class="value-cell">{{ vehicleDetails?.color || 'Не указан' }}</td>
              </tr>
              <tr>
                <td class="label-cell">Номер двигателя:</td>
                <td class="value-cell">{{ vehicleDetails?.engineNumber || 'Не указан' }}</td>
              </tr>
              <tr>
                <td class="label-cell">Номер кузова (шасси):</td>
                <td class="value-cell">{{ vehicleDetails?.bodyNumber || 'Не указан' }}</td>
              </tr>
              <tr>
                <td class="label-cell">Пробег:</td>
                <td class="value-cell">{{ vehicleDetails?.mileage || 'Не указан' }} км</td>
              </tr>
            </table>
          </div>
          <p>1.2. Покупатель обязуется принять указанное транспортное средство и уплатить за него денежную сумму согласно условиям настоящего договора.</p>
        </div>
      </section>

      <!-- 2. Цена договора и порядок расчетов -->
      <section class="summary-section">
        <h2 class="section-title">2. ЦЕНА ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ</h2>
        <div class="contract-text">
          <p>2.1. Цена транспортного средства составляет: <span class="price-amount">{{ formattedPrice }}</span> ({{ priceInWords }}).</p>
          <p>2.2. Расчеты по настоящему договору производятся в рублях Российской Федерации.</p>
          <p>2.3. Оплата производится единовременно при подписании настоящего договора.</p>
        </div>
      </section>

      <!-- 3. Права и обязанности сторон -->
      <section class="summary-section">
        <h2 class="section-title">3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
        <div class="contract-text">
          <p><strong>3.1. Продавец обязуется:</strong></p>
          <p>3.1.1. Передать Покупателю транспортное средство в состоянии, соответствующем условиям настоящего договора.</p>
          <p>3.1.2. Передать Покупателю все документы на транспортное средство.</p>
          <p>3.1.3. Гарантировать, что до заключения настоящего договора указанное транспортное средство никому не продано, не заложено, в споре и под арестом не состоит.</p>
          
          <p><strong>3.2. Покупатель обязуется:</strong></p>
          <p>3.2.1. Принять транспортное средство в установленный срок.</p>
          <p>3.2.2. Оплатить стоимость транспортного средства в размере и сроки, установленные настоящим договором.</p>
          <p>3.2.3. Переоформить транспортное средство на свое имя в установленном законом порядке.</p>
        </div>
      </section>

      <!-- 4. Переход права собственности -->
      <section class="summary-section">
        <h2 class="section-title">4. ПЕРЕХОД ПРАВА СОБСТВЕННОСТИ И РИСКА</h2>
        <div class="contract-text">
          <p>4.1. Право собственности на транспортное средство переходит к Покупателю с момента подписания настоящего договора и передачи транспортного средства.</p>
          <p>4.2. Риск случайной гибели или случайного повреждения транспортного средства переходит к Покупателю с момента его передачи.</p>
        </div>
      </section>

      <!-- 5. Дополнительные условия -->
      <section class="summary-section" v-if="formData.sellerComment">
        <h2 class="section-title">5. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</h2>
        <div class="contract-text">
          <p>5.1. {{ formData.sellerComment }}</p>
        </div>
      </section>

      <!-- 6. Заключительные положения -->
      <section class="summary-section">
        <h2 class="section-title">{{ formData.sellerComment ? '6' : '5' }}. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
        <div class="contract-text">
          <p>{{ formData.sellerComment ? '6' : '5' }}.1. Настоящий договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному для каждой из сторон.</p>
          <p>{{ formData.sellerComment ? '6' : '5' }}.2. Все изменения и дополнения к настоящему договору действительны лишь в случае, если они совершены в письменной форме и подписаны сторонами.</p>
          <p>{{ formData.sellerComment ? '6' : '5' }}.3. Настоящий договор вступает в силу с момента его подписания сторонами.</p>
        </div>
      </section>

      <!-- Реквизиты и подписи сторон -->
      <section class="summary-section parties-section">
        <h2 class="section-title">РЕКВИЗИТЫ И ПОДПИСИ СТОРОН</h2>
        
        <div class="parties-container">
          <div class="party-column">
            <h3 class="party-title">ПРОДАВЕЦ:</h3>
            <div class="party-details">
              <div class="party-name">{{ sellerFullName }}</div>
              <div class="party-info" v-if="sellerInfo">
                <div>Адрес: {{ sellerInfo.address }}</div>
                <div>{{ sellerInfo.city }}, {{ sellerInfo.country }}</div>
                <div>ИНН: {{ sellerInfo.inn }}</div>
                <div>Телефон: {{ sellerInfo.phone }}</div>
              </div>
            </div>
            <div class="signature-block">
              <div class="signature-line">
                Подпись: ___________________
              </div>
              <div class="signature-name">{{ sellerFullName }}</div>
            </div>
          </div>

          <div class="party-column">
            <h3 class="party-title">ПОКУПАТЕЛЬ:</h3>
            <div class="party-details">
              <div class="party-name">{{ buyerFullName }}</div>
              <div class="party-info" v-if="buyerInfo">
                <div>Телефон: {{ buyerInfo.phone }}</div>
                <div>Паспорт: {{ buyerInfo.passportSeries }} {{ buyerInfo.passportNumber }}</div>
                <div>Выдан: {{ buyerInfo.issueDate }}</div>
                <div>{{ buyerInfo.issuedBy }}</div>
              </div>
            </div>
            <div class="signature-block">
              <div class="signature-line">
                Подпись: ___________________
              </div>
              <div class="signature-name">{{ buyerFullName }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Акт приема-передачи -->
      <section class="summary-section transfer-act">
        <h2 class="section-title">АКТ ПРИЕМА-ПЕРЕДАЧИ ТРАНСПОРТНОГО СРЕДСТВА</h2>
        <div class="contract-text">
          <p>к договору купли-продажи от {{ formattedDate }}</p>
          <p><strong>Продавец</strong> {{ sellerFullName }} передал, а <strong>Покупатель</strong> {{ buyerFullName }} принял транспортное средство:</p>
          
          <div class="transfer-details">
            <p><strong>{{ vehicleDisplayName }}</strong>, VIN: <strong>{{ formData.vin }}</strong></p>
            <p>Техническое состояние: удовлетворительное</p>
            <p>Комплектность: полная</p>
          </div>

          <p>Претензий по качеству и комплектности транспортного средства Покупатель не имеет.</p>
          
          <div class="transfer-signatures">
            <div class="transfer-signature">
              <div>Передал: ___________________</div>
              <div class="signature-name">{{ sellerFullName }}</div>
            </div>
            <div class="transfer-signature">
              <div>Принял: ___________________</div>
              <div class="signature-name">{{ buyerFullName }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Кнопки действий -->
    <div class="action-buttons no-print">
      <button @click="goBack" class="btn-secondary">
        Назад к редактированию
      </button>
      <button @click="printContract" class="btn-primary">
        Печать договора
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { Car } from "@/entities/car";
import { Client } from "@/entities/client";
import { EmployeeType } from "@/entities/employee/types/employeeTypes";

// Props
interface SummaryFormData {
  city: string;
  date: string;
  sellerName: EmployeeType | null;
  buyerName: Client | null;
  vehicleModel: Car | null;
  sellerComment: string;
  price: string;
  vin: string;
}

const props = defineProps<{
  formData: SummaryFormData;
}>();

const emit = defineEmits<{
  goBack: [];

}>();

// Функция преобразования числа в слова (упрощенная версия)
const numberToWords = (num: number): string => {
  const ones = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
  const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  const teens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];

  if (num === 0) return 'ноль рублей';
  if (num >= 1000000) return num.toLocaleString('ru-RU') + ' рублей';

  let result = '';
  
  if (Math.floor(num / 100000) > 0) {
    result += hundreds[Math.floor(num / 100000)] + ' ';
    num %= 100000;
  }
  
  if (Math.floor(num / 10000) > 0) {
    if (Math.floor(num / 10000) === 1 && Math.floor((num % 10000) / 1000) > 0) {
      result += teens[Math.floor((num % 10000) / 1000)] + ' тысяч ';
      num %= 1000;
    } else {
      result += tens[Math.floor(num / 10000)] + ' ';
      num %= 10000;
      if (Math.floor(num / 1000) > 0) {
        result += ones[Math.floor(num / 1000)] + ' тысяч ';
        num %= 1000;
      }
    }
  } else if (Math.floor(num / 1000) > 0) {
    result += ones[Math.floor(num / 1000)] + ' тысяч ';
    num %= 1000;
  }
  
  // Сотни
  if (Math.floor(num / 100) > 0) {
    result += hundreds[Math.floor(num / 100)] + ' ';
    num %= 100;
  }
  
  // Десятки и единицы
  if (num >= 10 && num < 20) {
    result += teens[num - 10] + ' ';
  } else {
    if (Math.floor(num / 10) > 0) {
      result += tens[Math.floor(num / 10)] + ' ';
    }
    if (num % 10 > 0) {
      result += ones[num % 10] + ' ';
    }
  }
  
  return result.trim() + ' рублей';
};

// Computed properties
const formattedDate = computed(() => {
  if (!props.formData.date) return '';
  const date = new Date(props.formData.date);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedPrice = computed(() => {
  if (!props.formData.price) return '';
  const price = parseFloat(props.formData.price);
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(price);
});

const priceInWords = computed(() => {
  if (!props.formData.price) return '';
  const price = Math.floor(parseFloat(props.formData.price));
  return numberToWords(price);
});

const sellerFullName = computed(() => {
  if (!props.formData.sellerName) return '';
  const seller = props.formData.sellerName;
  return `${seller.last_name} ${seller.first_name} ${seller.middle_name || ''}`.trim();
});

const buyerFullName = computed(() => {
  if (!props.formData.buyerName) return '';
  const buyer = props.formData.buyerName;
  return `${buyer.secondName} ${buyer.firstName} ${buyer.patronymic}`.trim();
});

const vehicleDisplayName = computed(() => {
  if (!props.formData.vehicleModel) return '';
  return props.formData.vehicleModel.model || `Автомобиль ID: ${props.formData.vehicleModel.id}`;
});

const vehicleDetails = computed(() => {
  return props.formData.vehicleModel;
});

const sellerInfo = computed(() => ({
  country: "Россия",
  city: "Москва", 
  address: "ул. Примерная, д. 1",
  inn: "770123456789",
  okpo: "12345678",
  bik: "044525123",
  phone: "+7 (999) 123-45-67"
}));

const buyerInfo = computed(() => {
  if (!props.formData.buyerName) return null;
  const buyer = props.formData.buyerName;
  return {
    phone: buyer.phoneNumber,
    passportNumber: buyer.passportNumber,
    passportSeries: buyer.passportSeries,
    issueDate: buyer.dateOfIssue,
    issuedBy: buyer.issuedBy
  };
});

// Methods
const goBack = () => {
  emit('goBack');
};

const printContract = () => {
  // Скрываем все элементы страницы кроме договора
  const originalDisplay = document.body.style.display;
  const originalOverflow = document.body.style.overflow;
  
  // Создаем временные стили для печати
  const printStyles = document.createElement('style');
  printStyles.id = 'print-styles';
  printStyles.innerHTML = `
    @media print {
      * { visibility: hidden; }
      .summary-container, .summary-container * { visibility: visible; }
      .summary-container { 
        position: absolute !important; 
        left: 0 !important; 
        top: 0 !important; 
        width: 100% !important;
        margin: 0 !important;
        padding: 15mm !important;
        box-shadow: none !important;
      }
      .no-print { display: none !important; }
    }
  `;
  
  document.head.appendChild(printStyles);
  
  // Печатаем
  window.print();
  
  // Удаляем временные стили после печати
  setTimeout(() => {
    const styles = document.getElementById('print-styles');
    if (styles) {
      styles.remove();
    }
  }, 100);
};


</script>

<style scoped lang="scss">
.summary-container {
  max-width: 210mm; // A4 width
  margin: 0 auto;
  padding: 20mm;
  background: white;
  font-family: 'Times New Roman', serif;
  font-size: 12pt;
  line-height: 1.5;
  color: #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.summary-header {
  text-align: center;
  margin-bottom: 30px;
}

.summary-title {
  font-size: 14pt;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
  line-height: 1.3;
}

.contract-info {
  display: flex;
  justify-content: space-between;
  font-size: 12pt;
  margin-bottom: 20px;
}

.summary-section {
  margin-bottom: 25px;
  
  &.intro-section {
    text-align: justify;
    text-indent: 1.25cm;
  }
}

.section-title {
  font-size: 12pt;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.contract-text {
  text-align: justify;
  text-indent: 1.25cm;
  
  p {
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.intro-text {
  text-align: justify;
  text-indent: 1.25cm;
  margin-bottom: 20px;
}

.seller-name, .buyer-name {
  font-weight: bold;
  text-transform: uppercase;
}

.vehicle-details-table {
  margin: 15px 0;
  text-indent: 0;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
  
  td {
    border: 1px solid #000;
    padding: 8px;
    vertical-align: top;
  }
  
  .label-cell {
    width: 40%;
    font-weight: bold;
    background-color: #f5f5f5;
  }
  
  .value-cell {
    width: 60%;
    
    &.vin-cell {
      font-family: 'Courier New', monospace;
      font-weight: bold;
      letter-spacing: 1px;
    }
  }
}

.price-amount {
  font-weight: bold;
  font-size: 13pt;
}

.parties-section {
  page-break-before: auto;
  margin-top: 40px;
}

.parties-container {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 20px;
}

.party-column {
  flex: 1;
}

.party-title {
  font-size: 12pt;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  text-decoration: underline;
}

.party-details {
  margin-bottom: 30px;
}

.party-name {
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  font-size: 11pt;
}

.party-info {
  font-size: 10pt;
  line-height: 1.4;
  text-align: left;
  
  div {
    margin-bottom: 3px;
  }
}

.signature-block {
  margin-top: 40px;
  text-align: center;
}

.signature-line {
  margin-bottom: 10px;
  font-size: 11pt;
}

.signature-name {
  font-size: 10pt;
  font-style: italic;
}

.transfer-act {
  page-break-before: auto;
  margin-top: 50px;
  border-top: 2px solid #000;
  padding-top: 20px;
}

.transfer-details {
  margin: 15px 0;
  text-indent: 0;
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  
  p {
    margin-bottom: 5px;
    text-indent: 0;
  }
}

.transfer-signatures {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 30px;
}

.transfer-signature {
  flex: 1;
  text-align: center;
  
  div:first-child {
    margin-bottom: 10px;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.btn-primary, .btn-secondary, .btn-success {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0056b3;
  }
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: #545b62;
  }
}

.btn-success {
  background-color: #28a745;
  color: white;
  
  &:hover {
    background-color: #1e7e34;
  }
}

// Стили для печати по ГОСТу
@media print {
  @page {
    size: A4;
    margin: 20mm 15mm 15mm 30mm; // По ГОСТу: левое поле больше для подшивки
  }
  
  .summary-container {
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    font-size: 12pt !important;
    line-height: 1.5 !important;
  }

  .no-print {
    display: none !important;
  }

  .summary-section {
    page-break-inside: avoid;
    
    &.parties-section,
    &.transfer-act {
      page-break-before: auto;
    }
  }

  .section-title {
    page-break-after: avoid;
  }

  .details-table {
    page-break-inside: avoid;
  }

  .parties-container {
    page-break-inside: avoid;
  }

  .transfer-signatures {
    page-break-inside: avoid;
  }
  
  // Убираем тени и фоны для печати
  * {
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  
  .details-table .label-cell {
    background-color: #f0f0f0 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .transfer-details {
    background-color: #f5f5f5 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

@media (max-width: 768px) {
  .summary-container {
    padding: 15px;
    font-size: 11pt;
  }
  
  .parties-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .transfer-signatures {
    flex-direction: column;
    gap: 20px;
  }
  
  .action-buttons {
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .btn-primary, .btn-secondary, .btn-success {
    flex: 1;
    min-width: 120px;
  }
}
</style>
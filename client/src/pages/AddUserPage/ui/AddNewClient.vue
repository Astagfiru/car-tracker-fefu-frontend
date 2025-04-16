<script setup lang="ts">
import { ButtonCansel, ButtonConfirm} from '@/shared';
import { useRouter } from 'vue-router';
import { AddNewClientForm } from '@/widgets';

const router = useRouter();

const previosStep = () => {
  router.back();
};

const nextStep = () => {

};
</script>

<template>
  <div class="layout">
    <div class="content-box">
      <header class="page-header">
        <h1>Добавление нового клиента</h1>
        <h3 class="grey-lighten-5">Заполните личные данные клиента</h3>
      </header>

      <section class="form-content">
            <AddNewClientForm/>
      </section>

      <footer class="footer-actions">
        <ButtonCansel title="Отмена" :onClick="previosStep" />
        <ButtonConfirm title="Сохранить" :onClick="nextStep" />
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
    min-height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    box-sizing: border-box;
    width: 50vw;
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
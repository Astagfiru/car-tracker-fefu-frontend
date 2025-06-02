<template>
  <div class="client-page">
    <ButtonBack previousPageTitle="Главная" previousRouteName="clients"/>
    <Title title="Формирование формы купли продажи"/>
    <div class="content">
        <PurhaseAndSaleFormVue />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonBack } from '@/shared';
import { Title, PurhaseAndSaleFormVue } from '@/shared';
</script>

<style scoped lang="scss">
</style>

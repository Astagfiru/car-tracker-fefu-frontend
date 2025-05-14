<template>
  <div class="client-page">
    <Title title="Склад"/>
    <div class="content">
      <AllCarsTable />
      <AllCarModelsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Title } from "@/shared";
import { AllCarsTable } from "@/widgets/carsTable";
import { AllCarModelsTable } from "@/widgets/carsTable";
</script>

<style scoped lang="scss">

</style>

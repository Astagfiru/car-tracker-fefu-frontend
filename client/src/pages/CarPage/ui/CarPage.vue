<template>
  <div class="client-page">
    <Title title="Склад"/>
    <div class="content">
      <RedirectButton class="mt-3"/>
      <AllCarModelsTable />
      <div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Title } from "@/shared";
// import { AllCarsTable } from "@/widgets/carsTable";
import { RedirectButton } from "@/shared";
import { AllCarModelsTable } from "@/widgets/carsTable";
</script>

<style scoped lang="scss"></style>

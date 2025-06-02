<template>
  <div class="client-page">
    <Title title="Сотрудники"/>
    <div class="content">
      <AllEmployeersTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Title } from "@/shared";
import { AllEmployeersTable } from "@/widgets"
</script>

<style scoped lang="scss">
</style>

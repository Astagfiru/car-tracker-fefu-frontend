<template>
  <div class="client-page">
    <Title title="Клиенты"/>
    <div class="content">
      <AllClientsTable/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Title } from "@/shared";
import { AllClientsTable } from "@/widgets";
</script>

<style scoped lang="scss">

</style>

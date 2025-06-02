<template>
  <div class="client-page">
    <Title title="Заявки"/>
    <div class="content">
      <ApplicationsTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Title } from "@/shared";
import { ApplicationsTable } from "@/widgets/applicationTable";
</script>

<style scoped lang="scss">

</style>

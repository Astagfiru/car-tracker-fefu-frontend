<template>
  <div class="client-page">
    <ButtonBack previousPageTitle="Сотрудники" previousRouteName="employeers"/>
    <div class="content">
      <AddEmployeer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddEmployeer } from "@/widgets/addEmployeerForm"
import {ButtonBack} from "@/shared"
</script>

<style scoped lang="scss">

</style>

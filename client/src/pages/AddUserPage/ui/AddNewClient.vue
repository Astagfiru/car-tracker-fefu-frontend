<template>
  <div class="client-page">
    <ButtonBack previousPageTitle="Клиенты" previousRouteName="clients"/>
    <div class="content">
      <AddClient />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AddClient } from "@/widgets/addUserForm"
import { ButtonBack } from "@/shared"
</script>

<style scoped lang="scss">

</style>

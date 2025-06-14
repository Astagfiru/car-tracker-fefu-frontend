<template>
  <div class="content">
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
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
} 
</style>
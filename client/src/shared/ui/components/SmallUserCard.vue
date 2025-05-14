<script setup lang="ts">
interface SmallUserCardTypes {
  img?: string;
  name: string;
  surname: string;
}

const props = withDefaults(defineProps<SmallUserCardTypes>(), {
  
})
</script>

<template>
    <div class="wrapper">
      <div class="user__img-wrapper">
        <div v-if="!img" class="placeholder"></div>
        <img v-else :src="img" alt="User Avatar" class="user__img" />
      </div>
      <div class="user__name">
        <div>{{ name }}</div>
        <div>{{ surname }}</div>
      </div>
    </div>
  </template>

  <style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 150px;
    width: fit-content;
    cursor : pointer;
    transition: background 0.2s ease-in-out;
    padding: 10px 20px;
    border-radius: 10px;

    &:hover {
        background: oklch(0.9 0 328);
    }
  }
  
  .user__img-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #95a5ff;
    flex-shrink: 0;
    margin-right: 10px;
  }
  
  .user__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    background-color: #95a5ff;
    border-radius: 50%;
  }
  </style>
  
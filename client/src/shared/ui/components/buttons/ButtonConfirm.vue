<template>
    <v-btn 
      :color="color" 
      :disabled="disabled" 
      @click="onClick" 
      class="button-with-text-icon"
    >
      <slot name="icon"></slot>
      <span class="button-text">
        {{ title }}
      </span>
    </v-btn>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const color = ref('purple');
  const disabled = ref(false);
  
  interface Button {
    onClick: () => void;
    title: string;
  }
  
  defineProps<Button>();
  </script>
  
  <style scoped lang="scss">
  .button-with-text-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
  }
  
  .button-with-text-icon .button-text {
    margin-left: 8px;
    font-size: 16px;
  }
  
  .v-btn {
    background-color: #2563EB;
    color: white;
  }
  
  .v-btn[disabled] {
    background-color: #d3d3d3;
    color: #9e9e9e;
  }
  </style>
  
<template>
    <v-btn 
      :color="color" 
      :disabled="disabled" 
      @click="onClick" 
      class="close-button"
      variant="flat"
    >
      <slot name="icon"></slot>
      <span class="close-button-text">
        {{ title }}
      </span>
    </v-btn>
  </template>
  
  <script setup lang="ts">
  const color = 'grey-lighten-3';
  const disabled = false;
  
  interface ButtonProps {
    onClick: () => void;
    title: string;
  }
  
  defineProps<ButtonProps>();
  </script>
  
  <style scoped lang="scss">
  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: none;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #E5E7EB !important;
    color: #111827;
    transition: background-color 0.3s ease;
  }
  
  .close-button:hover {
    background-color: #d1d5db !important;
  }
  
  .close-button:active {
    background-color: #9ca3af !important;
  }
  
  .close-button-text {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 500;
  }
  </style>
  
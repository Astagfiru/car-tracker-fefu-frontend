<template>
    <button
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
    </button>
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
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #f1f1f1 !important;
    color: #111827;
    transition: filter 0.2s ease;
  
    &:hover {
      filter: brightness(95%);
    }
  
    &:active {
      filter: brightness(85%);
    }
  }

  .close-button-text {
    font-size: 14px;
    font-weight: 500;
  }
  </style>
  
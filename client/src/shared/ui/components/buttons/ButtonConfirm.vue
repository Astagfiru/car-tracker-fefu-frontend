<template>
  <button
    :color="color" 
    :disabled="disabled" 
    @click="onClick" 
    class="close-button"
    variant="flat"
    :class="{'dis' : disabled}"
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
  onClick?: () => void;
  title: string;
  disabled: boolean;
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
  background-color: #4e79d6!important;
  color: #ffffff;
  transition: filter 0.2s ease;
  font-weight: 700;

  &:hover {
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(85%);
  }
}

.dis {
  pointer-events: none;
  opacity: 0.5;
}

.close-button-text {
  margin-left: 8px;
  font-size: 14px;
  font-weight: 500;
}
</style>

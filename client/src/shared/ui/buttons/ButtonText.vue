<template>
  <button
    :disabled="disabled"
    @click="onClick"
    class="square-button"
    :class="{ dis: disabled }"
  >
    <slot>
    </slot>
  </button>
</template>

<script setup lang="ts">
const color = 'grey-lighten-3';
const disabled = false;

interface ButtonProps {
  onClick?: () => void;
  disabled: boolean;
}

defineProps<ButtonProps>();
</script>

<style scoped lang="scss">
.square-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #4e79d6 !important;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: filter 0.2s ease;

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
</style>

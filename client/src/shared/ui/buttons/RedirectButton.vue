<template>
  <button
    :disabled="disabled"
    @click="redirect"
    class="square-button"
    :class="{ dis: disabled }"
  >
   <div>
    Продать автомобиль
   </div>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const color = 'grey-lighten-3';
const disabled = false;

interface ButtonProps {
  onClick?: () => void;
}

const redirect = () => {
    router.push({name : "create-request"})
}

defineProps<ButtonProps>();
</script>

<style scoped lang="scss">
.square-button {
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #4e79d6 !important;
  color: #ffffff;
  border: none;
  padding: 0;
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

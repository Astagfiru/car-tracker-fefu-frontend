<script setup lang="ts">
import { useRouter } from "vue-router";
import { Back } from "@/shared";

const router = useRouter();

const props = defineProps({
  previousRouteName: {
    type: String,
    required: true,
  },
  previousPageTitle: {
    type: String,
    required: true,
  },
});

const prevStep = () => {
  router.back();
};
</script>

<template>
  <div class="back-navigation" @click="prevStep">
    <Back class="back-icon" />
    <span class="back-text">{{ previousPageTitle }}</span>
  </div>
</template>

<style scoped lang="scss">
.back-navigation {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  color: #333;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #4A73CB;
  }

  &:active {
    transform: scale(0.98);
  }

  .back-icon {
    width: 24px;
    height: 24px;

    :deep(path) {
      fill: currentColor;
      transition: fill 0.2s ease;
    }
  }

  .back-text {
    font-size: 16px;
    font-weight: 500;
  }

  @media (max-width: 599px) {
    .back-text {
      font-size: 14px;
    }

    .back-icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>

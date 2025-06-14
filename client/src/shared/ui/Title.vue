<template>
  <div class="title">
    {{ title }}
  </div>
</template>
<script setup lang="ts">
interface TitleProps {
  title: string;
}

defineProps<TitleProps>();
</script>
<style scoped>
.title {
  width: 100%;
  font-size: 2em;
  font-weight: 700;

}

</style>

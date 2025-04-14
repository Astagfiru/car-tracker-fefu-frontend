<template>
  <div class="app">
    <header>
      <Header />
    </header>
    <main class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.path" />
        </keep-alive>
      </router-view>
    </main>
    <footer>

    </footer>
  </div>
</template>
<script setup lang="ts">
import { Header } from '@/widgets';

</script>
<style scoped lang="scss">
.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
}
</style>
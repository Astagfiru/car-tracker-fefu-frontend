<template>
  <div class="app">
    <header>
      <SmallUserCard name="user" surname="surmane"/>
    </header>
    <main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.path" />
        </keep-alive>
      </router-view>
    </main>
    <footer>Подвал</footer>
  </div>
</template>
<script setup lang="ts">
import { SmallUserCard } from '@/shared';
</script>
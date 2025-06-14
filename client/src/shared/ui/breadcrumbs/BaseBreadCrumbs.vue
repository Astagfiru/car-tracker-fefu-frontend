<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template #item="{ item, index }">
      <span
        :class="[
          'breadcrumb-item',
          { 'breadcrumb-active': item.disabled }
        ]"
      >
        <router-link
          v-if="!item.disabled && item.to"
          :to="item.to"
          class="breadcrumb-link"
        >{{ item.title }}</router-link>
        <span v-else>{{ item.title }}</span>
      </span>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const crumbs = route.matched
    .filter(r => r.meta && r.meta.title)
    .map(r => ({
      title: r.meta.title as string,
      disabled: router.resolve(r).href === router.resolve(route.fullPath).href,
      to: router.resolve(r).href !== router.resolve(route.fullPath).href ? router.resolve(r).href : undefined,
    }))
  if (route.path !== '/') {
    return [
      {
        title: 'Главная',
        disabled: route.path === '/',
        to: route.path !== '/' ? router.resolve('/').href : undefined,
      },
      ...crumbs
    ]
  } else {
    return [
      ...crumbs
    ]
  }
})
</script>

<style scoped>
.breadcrumb-item {
  font-weight: 500;
  color: #555;
}
.breadcrumb-link {
  color: #000000;
  transition: color 0.2s;
}
.breadcrumb-link:hover {
  color: #b3b3b3;
}
.breadcrumb-active {
  color: #4E79D6;
}
</style>
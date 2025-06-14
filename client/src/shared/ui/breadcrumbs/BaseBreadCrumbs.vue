<template>
  <v-breadcrumbs :items="breadcrumbs">
    <template #item="{ item }">
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
  let fullPath = ''
  return route.matched
    .filter(r => r.meta && r.meta.title)
    .map((r, idx, arr) => {
      let path = r.path
      Object.entries(route.params).forEach(([key, value]) => {
        path = path.replace(':' + key, value as string)
      })
      if (path.startsWith('/')) {
        fullPath = path
      } else if (path) {
        if (!fullPath.endsWith('/')) fullPath += '/'
        fullPath += path
      }
      fullPath = fullPath.replace(/\/{2,}/g, '/')
      return {
        title: r.meta.title as string,
        disabled: idx === arr.length - 1,
        to: idx === arr.length - 1 ? undefined : fullPath || '/',
      }
    })
})
</script>

<style scoped>
.breadcrumb-item {
  font-weight: 500;
  color: #555;
}
.breadcrumb-link {
  color: #2e2e2e;
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover {
  color: #2e2e2e;
  text-decoration: underline;
}
.breadcrumb-active {
  color: #4E79D6;;
}
</style>
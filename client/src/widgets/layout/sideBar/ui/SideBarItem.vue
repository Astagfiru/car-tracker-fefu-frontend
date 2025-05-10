<script setup lang="ts">
import { SideBar } from "../config/index";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { SIDE_BAR_ROWS } from '../config/index';

const route = useRoute();

const isActiveRoute = (routePath: string): boolean => {
  return route.path === routePath;
};

interface SideBarItemProps {
  item: SideBar;
}

defineProps<SideBarItemProps>();
</script>
<template>
  <router-link
    v-if="item.to"
    :to="item.to"
    class="sidebar__nav-link"
    :class="{ 'sidebar__nav-link--active': isActiveRoute(item.to) }"
  >
    <span v-if="item.icon" class="sidebar__nav-icon">
      <component :is="item.icon" />
    </span>
    {{ item.label }}
  </router-link>
  <a v-else-if="item.href" :href="item.href" class="sidebar__nav-link">
    <span v-if="item.icon" class="sidebar__nav-icon">
      <component :is="item.icon" />
    </span>
    {{ item.label }}
  </a>
  <span v-else class="sidebar__nav-link">
    <span v-if="item.icon" class="sidebar__nav-icon">
      <component :is="item.icon" />
    </span>
    {{ item.label }}
  </span>
</template>

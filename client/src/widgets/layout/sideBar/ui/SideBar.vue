<template>
  <div class="sidebar">
    <nav class="sidebar__nav">
      <ul>
        <li
          v-for="item in SIDE_BAR_ROWS"
          :key="item.id"
          class="sidebar__nav-item"
        >
          <SideBarItem :item="item" />
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { SIDE_BAR_ROWS } from "../config/index";
import SideBarItem from "./SideBarItem.vue";

</script>

<style lang="scss">
.sidebar {
  width: 15vw;
  min-width: 200px;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  top: 70px;
  position: fixed;
  z-index: 1000;
}

.sidebar__nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &-item {
    margin-bottom: 10px;
  }

  &-link {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
    border-radius: 5px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #d7e3ff;
    }

    &--active {
      background-color: #d7e3ff;
    }
  }

  &-icon {
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  }
}
</style>

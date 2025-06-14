<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { SIDE_BAR_ROWS } from "../config/index";
import SideBarItem from "./SideBarItem.vue";

const props = defineProps<{ width: number }>();
const emit = defineEmits<{
  (e: "resize", width: number): void;
}>();

const sidebarWidth = ref(props.width);
const isResizing = ref(false);

const minWidth = 180;
const maxWidth = 500;

watch(() => props.width, (val) => {
  sidebarWidth.value = val;
});

const onMouseDown = () => {
  isResizing.value = true;
  document.body.style.cursor = "ew-resize";
};

const onMouseMove = (e: MouseEvent) => {
  if (!isResizing.value) return;
  const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
  sidebarWidth.value = newWidth;
  emit("resize", newWidth);
};

const onMouseUp = () => {
  if (isResizing.value) {
    isResizing.value = false;
    document.body.style.cursor = "";
  }
};

window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);
</script>

<template>
  <div
    class="sidebar"
    :style="{ width: sidebarWidth + 'px' }"
  >
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
    <div
      class="sidebar__resizer"
      @mousedown="onMouseDown"
    ></div>
  </div>
</template>

<style lang="scss">
.sidebar {
  min-width: 180px;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px 0 20px 20px;
  box-shadow: 2px 0px 5px rgba(71, 58, 71, 0.1);
  z-index: 1000;
  transition: width 0.15s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 20px;
}
.sidebar__resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 100%;
  cursor: ew-resize;
  background: transparent;
  z-index: 10;
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
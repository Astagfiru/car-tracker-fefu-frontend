<template>
  <div class="toolbar">
    <div class="search-container">
      <SearchInput class="search-input" />
    </div>
    <div class="button-container">
      <ButtonConfirm
        :onClick="addRedirect"
        :disabled="addButtonDisables"
        class="btn"
      >
        <template #icon>
          <Plus />
        </template>
      </ButtonConfirm>
    </div>
  </div>
</template>


<script setup lang="ts">
import { withDefaults } from "vue";
import { SearchInput, ButtonConfirm } from "@/shared";
import { Plus } from "@/shared";

interface ToolbarProps {
  addButtonTitle?: string;
  addButtonDisables?: boolean;
  addRedirect: () => void;
}

withDefaults(defineProps<ToolbarProps>(), {
  addButtonDisables: false,
  addButtonTitle: "Добавить",
});
</script>
<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.search-container {
  flex: 1;
}

.search-input {
  width: 100%;
}
</style>


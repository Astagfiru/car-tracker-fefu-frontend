<template>
  <div class="toolbar">
    <div class="search-container">
      <SearchInput
        class="search-input"
        v-model="searchString"
        :clearFunction="clearFunction"
      />
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
        {{ addButtonTitle }}
      </ButtonConfirm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchInput, ButtonConfirm } from "@/shared";
import { Plus } from "@/shared";

interface ToolbarProps {
  addButtonTitle?: string;
  addButtonDisables?: boolean;
  addRedirect: () => void;
  onSearch?: (query: string) => void;
  clearFunction: () => void;
}

withDefaults(defineProps<ToolbarProps>(), {
  addButtonDisables: false,
  addButtonTitle: "Добавить",
});

const searchString = defineModel<string>('searchString')

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

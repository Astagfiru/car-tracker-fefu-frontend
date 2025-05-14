<template>
  <div>
    <ButtonConfirm
      :onClick="addRedirect"
      :title="addButtonTitle"
      :disabled="addButtonDisables"
      class="btn"
    >
      <template #icon>
        <Plus />
      </template>
    </ButtonConfirm>
  </div>
</template>
<script setup lang="ts">
import { withDefaults } from "vue";
import { Plus } from "@/shared";
import { ButtonConfirm } from "@/shared";

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

<script setup lang="ts">
import { NotificationIcon } from '@/shared';
</script>
<template>
    <button class="btn__notification--simple">
        <NotificationIcon />
    </button>
</template>
<style scoped lang="scss">
.btn__notification--simple {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;

    transition: background 0.2s ease-in-out;

    &:hover {
        background: oklch(0.83 0 328);
    }
}
</style>
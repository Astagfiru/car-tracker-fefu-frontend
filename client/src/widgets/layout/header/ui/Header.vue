<script setup lang="ts">
import HeaderLogo from './HeaderLogo.vue';
import SmallUserCard from '@/shared/ui/SmallUserCard.vue';
import { NotificationIcon } from '@/shared';
</script>

<template>
    <header class="header">
        <div class="header__left">
            <HeaderLogo class="header__logo" />
            <h4 class="header__title">Автомир |</h4>
            <h4 class="header__title-admin">Админ-панель</h4>
        </div>
        <div class="header__right">
            <NotificationIcon class="mr-5" />
            <SmallUserCard name="Мария" surname="Иванова" />
        </div>
    </header>
</template>

<style scoped>
.header {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 40px;
    background-color: rgb(255, 255, 255);
    width: 100vw;
    height: 70px;
    position: fixed;
    z-index: 101;
}

.header__left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.header__title {
    font-size: 1.25rem;
    margin: 0;
}

.header__title-admin {
    font-size: 1.25rem;
    margin: 0;
    color: #4A73CB;
    font-weight: 500;
}

.header__right {
    display: flex;
    align-items: center;
}
</style>

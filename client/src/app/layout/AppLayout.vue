<template>
  <div class="app">
    <template v-if="isLoading">
      <div class="loader-container">
        <fulfilling-square-spinner
          :animation-duration="1000"
          :size="50"
          color="#95A4FB"
        />
      </div>
    </template>
    <template v-else>
      <header class="header">
        <Header />
      </header>
      <main class="main">
        <div class="side">
          <SideBar />
        </div>
        <div class="content">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" :key="$route.path" />
            </keep-alive>
          </router-view>
        </div>
      </main>
      <footer></footer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Header, SideBar } from "@/widgets";
import { FulfillingSquareSpinner } from "epic-spinners";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 70px;
  z-index: 100;
}

.side {
  min-width: 200px;
}

.content {
  width: 70vw;
  margin-top: 50px;
}

.loader-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

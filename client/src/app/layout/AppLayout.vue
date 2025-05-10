<template>
  <div class="app">
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
    <footer>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { Header, SideBar } from "@/widgets";
</script>
<style scoped lang="scss">
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

</style>

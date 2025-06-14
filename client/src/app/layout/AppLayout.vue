<template>
  <div class="app">
    <header class="header">
      <Header />
    </header>
      <div class="layout-main">
        <aside class="sidebar-wrap">
          <SideBar :width="sidebarWidth" @resize="handleSidebarResize" />
        </aside>
        <main class="content">
          <div class="content-inner">
            <div class="breadcrumbs-box">
              <Breadcrumbs />
            </div>
            <div class="table-area">
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" :key="$route.path" />
                </keep-alive>
              </router-view>
            </div>
          </div>
        </main>
      </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Header, SideBar } from "@/widgets";
import { Breadcrumbs } from "@/shared";

const sidebarWidth = ref(240);
const handleSidebarResize = (width: number) => {
  sidebarWidth.value = width;
};
</script>

<style scoped lang="scss">
$app-header-height: 64px;
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  height: $app-header-height;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
  box-shadow: 0 2px 8px 0 #f0f0f01a;
}
.layout-main {
  display: flex;
  flex: 1 1 auto;
  margin-top: $app-header-height;
  height: calc(100vh - #{$app-header-height});
}
.sidebar-wrap {
  height: 100%;
  min-width: 180px;
  max-width: 500px;
  width: 240px;
  transition: width 0.15s;
  background: #fff;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.07);
  z-index: 10;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  background: #ffffff;
  padding: 32px 40px;
  overflow-x: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
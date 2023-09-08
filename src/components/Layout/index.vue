<template>
  <div class="layout">
    <Header></Header>
    <div class="body">
      <AsideMenu class="aside-menu"></AsideMenu>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Layout/components/Header.vue";
import AsideMenu from "@/components/Layout/components/AsideMenu.vue";

</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  background-color: #F2F3F5;

  .body {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-between;
    padding: 20px;

    .main {
      width: 100%;
      padding-left: 20px;
    }
  }
}
</style>

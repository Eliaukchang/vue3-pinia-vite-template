<template>
  <div class="layout">
    <Header></Header>
    <div class="body">
      <AsideMenu></AsideMenu>
      <PageMain></PageMain>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Layout/components/Header.vue";
import AsideMenu from "@/components/Layout/components/AsideMenu.vue";
import PageMain from "@/components/Layout/components/PageMain.vue";

</script>

<style lang="scss" scoped>
.layout {
  background-color: #F2F3F5;

  .body {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: space-between;
  }
}
</style>

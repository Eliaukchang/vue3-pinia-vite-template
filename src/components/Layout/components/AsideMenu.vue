<template>
  <div class="aside">
    <div class="menu">
      <el-menu
          default-active="/showDialogComponents/index"
          :default-openeds="defaultOpends"
          class="el-menu"
          :collapse="isCollapse"
          active-text-color="#894811"
          router
          @open="handleOpen"
          @close="handleClose"
      >
        <el-sub-menu :index="item.routePath" v-for="(item, index) in menuList" :key="index">
          <template #title>
            <el-icon>
              <i-ep-menu/>
            </el-icon>
            <span>{{ item.meta.menuName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="item.routePath" v-for="(item, index) in item.children" :key="index">
              {{ item.meta.menuName }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import menuList from "@/components/Layout/config/menuList.js";

const isCollapse = ref(false)
/**
 *  注释：computed
 * */
// 默认展开的sub-menu的index值组成的数组
const defaultOpends = computed(() => {
  return menuList.map(item => item.routePath)
})

// 处理菜单折叠
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleOpen = () => {
}

const handleClose = () => {
}


</script>

<style lang="scss" scoped>
.aside {
  height: calc(100% - 40px);

  .menu {
    width: 260px;
    height: 100%;
    position: relative;

    :deep(.el-menu) {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 8px;
      border: none;


      .el-menu-item-group__title {
        padding: 0;
      }

      .el-sub-menu__title {
        font-size: 16px;
        font-weight: 600;
        padding-bottom: 0;

        &:hover {
          background-color: $theme-light-color !important;

        }
      }

      .el-menu-item {
        margin: 5px;

        &.is-active {
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          background-color: $theme-color;
        }

        &:hover {
          margin: 5px;
          background-color: $theme-light-color;
        }
      }
    }

    .collapseBtn {
      position: absolute;
      bottom: 5px;
      left: 5px;
    }
  }
}

</style>

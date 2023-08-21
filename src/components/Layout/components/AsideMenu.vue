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
const isCollapse = ref(false)
const menuList = reactive([
  {
    routePath: '/dialogComponents',
    name: 'dialogComponents',
    meta: {
      menuName: '弹窗相关组件',
      menuIcon: '',
    },
    children: [
      {
        routePath: '/showDialogComponents/index',
        name: 'showDialogComponents',
        meta: {
          menuName: '组件展示',
          menuIcon: '',
        }
      },
    ]
  },
  {
    routePath: '/tableComponents',
    name: 'tableComponents',
    meta: {
      menuName: '表格相关组件',
      menuIcon: '',
    },
    children: [
      {
        routePath: '/showTableComponents/index',
        name: 'showTableComponents',
        meta: {
          menuName: '组件展示',
          menuIcon: '',
        }
      },
    ]
  }
])

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
  padding: 20px;

  .menu {
    position: relative;
    height: 100%;
    width: 260px;

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

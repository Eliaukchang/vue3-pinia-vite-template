<template>
  <div class="aside">
    <div class="menu">
      <el-menu
          default-active="1"
          class="el-menu"
          :collapse="isCollapse"
          active-text-color="#894811"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-sub-menu :index="item.id" v-for="(item, index) in menuList" :key="index">
          <template #title>
            <el-icon>
              <i-ep-menu/>
            </el-icon>
            <span>{{ item.oneLevelTitle }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :index="item.id" v-for="(item, index) in item.children" :key="index">
              {{ item.twoLevelTitle }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
      <!--      <el-button class="collapseBtn" @click="handleCollapse">折叠</el-button>-->
    </div>
  </div>
</template>

<script setup>
const isCollapse = ref(false)
const menuList = reactive([
  {
    oneLevelTitle: '一级标题',
    id: '1',
    children: [
      {
        twoLevelTitle: '二级标题-1',
        id: '1-1',
        routerPath: ''
      },
      {
        twoLevelTitle: '二级标题-2',
        id: '1-2',
        routerPath: ''
      }
    ]
  },
  {
    oneLevelTitle: '一级标题',
    id: '2',
    children: [
      {
        twoLevelTitle: '二级标题-1',
        id: '2-1',
        routerPath: ''
      },
      {
        twoLevelTitle: '二级标题-2',
        id: '2-2',
        routerPath: ''
      }
    ]
  }
])

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
  padding: 20px 24px;

  .menu {
    position: relative;
    height: 100%;
    width: 260px;

    ::v-deep {
      .el-menu {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 8px;
        border: none;
      }

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

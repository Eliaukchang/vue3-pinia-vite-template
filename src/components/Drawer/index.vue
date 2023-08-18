/**
*  注释：封装的抽屉Drawer组件
* */
<template>
  <el-drawer :model-value="visible" :with-header="withHeader" :direction="direction"
             :close-on-click-modal="closeOnClickModal" :z-index="zIndex" :size="customWidth"
             :close-on-press-escape="closeOnPressEscape" :destroy-on-close="destroyOnClose" :modal="modal"
             :show-close="showClose" :append-to-body="appendToBody"
             :before-close="beforeClose" @open="open" @close="close"
  >
    <template #header>
      <slot name="header"></slot>
      <div v-if="showDefaultHeader && !$slots.header" class="drawer-title">{{ title }}</div>
    </template>
    <slot></slot>
    <template #footer v-if="showDefaultFooter && !$slots.footer">
      <slot name="footer"></slot>
      <div style="flex: auto" v-if="!$slots.footer">
        <el-button v-if="showCancelBtn" @click="close">{{ cancelBtnText }}</el-button>
        <el-button v-if="showConfirmBtn" type="primary" :loading="confirmBtnLoading" :disabled="disabledConfirmBtn"
                   @click="confirm">{{
            confirmBtnText
          }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
/**
 *  注释：props
 * */
const props = defineProps({
  // 显示与隐藏
  visible: {
    type: Boolean,
    default: false
  },
  // 标题
  title: {
    type: String,
    default: '查看'
  },
  // 是否需要关闭前的回调
  isBeforeClose: {
    type: Boolean,
    default: true
  },
  // 抽屉打开的方向 rtl/ltr/ttb/btt
  direction: {
    type: String,
    default: 'rtl'
  },
  // 是否点击modal关闭抽屉
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  // 是否按下esc关闭抽屉
  closeOnPressEscape: {
    type: Boolean,
    default: false
  },
  // 是否需要关闭抽屉后销毁内部DOM
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  // 是否需要遮罩层
  modal: {
    type: Boolean,
    default: true
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  // 是否显示标题栏(包括关闭按钮)
  withHeader: {
    type: Boolean,
    default: true
  },
  // 抽屉的z-index
  zIndex: {
    type: Number,
    default: 1
  },
  // 自定义抽屉的宽度(数值类型)
  customWidth: {
    type: Number,
    default: 600
  },
  // 是否显示头部内容
  showDefaultHeader: {
    type: Boolean,
    default: true
  },
  // 是否显示底部按钮
  showDefaultFooter: {
    type: Boolean,
    default: true
  },
  // 是否显示底部取消按钮
  showCancelBtn: {
    type: Boolean,
    default: true
  },
  // 是否显示底部确认按钮
  showConfirmBtn: {
    type: Boolean,
    default: true
  },
  // 底部'取消'按钮文本
  cancelBtnText: {
    type: String,
    default: '取消'
  },
  // 底部'确认'按钮文本
  confirmBtnText: {
    type: String,
    default: '确定'
  },
  // 是否显示底部'确认'按钮的loading效果
  confirmBtnLoading: {
    type: Boolean,
    default: false
  },
  // 是否禁用底部'确认'按钮
  disabledConfirmBtn: {
    type: Boolean,
    default: false
  },
  // 是否挂载在body身上
  appendToBody: {
    type: Boolean,
    default: true
  }
})


/**
 *  注释：emits
 * */
const emits = defineEmits(['beforeClose', 'close', 'open', 'confirm'])

// 关闭之前的回调
const beforeClose = (done) => {
  if (props.isBeforeClose) {
    emits('beforeClose', done)
  } else {
    emits('close')
  }
}

// 打开
const open = () => {
  emits('open')
}

// 关闭
const close = () => {
  emits('close')
}

// 确定
const confirm = () => {
  emits('confirm')
}
</script>

<style lang="scss" scoped>
.drawer-title {
  font-weight: 600;
  font-size: 16px;
  color: #262626;
}
</style>

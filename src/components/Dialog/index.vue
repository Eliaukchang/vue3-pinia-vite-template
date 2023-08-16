/**
*  注释：封装的对话框Dialog组件
* */
<template>
  <!-- @click.stop--阻止冒泡事件 -->
  <div @click.stop>
    <el-dialog :model-value="visible" :show-close="showClose" :class="customClass"
               :close-on-click-modal="closeOnClickModal"
               :width="dialogWidth" :modal="modal" :close-on-press-escape="closeOnPressEscape"
               :align-center="alignCenter" :top="top" :destroy-on-close="destroyOnClose" :before-close="beforeClose"
               @close="cancel"
               append-to-body>
      <template #header>
        <slot name="header"></slot>
        <div v-if="showDefaultHeader && !$slots.header" class="dialog-title">{{ title }}</div>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer"></slot>
        <span class="dialog-footer" v-if="showDefaultFooter && !$slots.footer">
          <el-button @click="cancel">{{ cancelBtnText }}</el-button>
          <el-button type="primary" @click="confirm" :disabled="disabledConfirmBtn"
                     :loading="confirmBtnLoading">{{ confirmBtnText }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {computed, reactive} from "vue";

/**
 *  注释：props
 * */
const props = defineProps({
  // 是否显示对话框
  visible: {
    type: Boolean,
    default: false
  },
  // 标题
  title: {
    type: String,
    default: '查看'
  },
  // 自定义对话框的宽度
  customWidth: {
    type: String,
    default: '1000px'
  },
  // 自定义对话框的宽度size
  size: {
    type: String,
    default: ''
  },
  // 是否需要遮罩层
  modal: {
    type: Boolean,
    default: true
  },
  // 是否显示右上角关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  // 是否显示对话框底部默认的按钮
  showDefaultFooter: {
    type: Boolean,
    default: true
  },
  // 是否显示对话框头部的标题
  showDefaultHeader: {
    type: Boolean,
    default: true
  },
  // 是否可以按下esc关闭对话框
  closeOnPressEscape: {
    type: Boolean,
    default: false
  },
  // 是否可以点击modal关闭对话框
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  // 是否水平垂直对齐对话框
  alignCenter: {
    type: Boolean,
    default: true
  },
  // Dialog的margin-top值,与alignCenter不可同时使用
  top: {
    type: String,
    default: '15vh'
  },
  // 是否需要在对话框关闭之前执行某些事件
  isBeforeClose: {
    type: Boolean,
    default: false
  },
  // 自定义class todo
  customClass: {
    type: String,
    default: ''
  },
  // 自定义取消按钮的文本
  cancelBtnText: {
    type: String,
    default: '取消'
  },
  // 自定义取消按钮的文本
  confirmBtnText: {
    type: String,
    default: '确定'
  },
  // 是否禁用'确定'按钮
  disabledConfirmBtn: {
    type: Boolean,
    default: false
  },
  // 是否显示'确认'按钮的loading效果
  confirmBtnLoading: {
    type: Boolean,
    default: false
  },
  // 是否当关闭 Dialog时，销毁其中的元素
  destroyOnClose: {
    type: Boolean,
    default: false
  }
})

/**
 *  注释：dialogWidth--对话框的宽度
 * */
const sizeMap = reactive({
  large: '1000px',
  medium: '800px',
  small: '600px'
})
const dialogWidth = computed(() => {
  return props.customWidth || sizeMap[props.size] || '800px';
})


/**
 *  注释：emits--触发的事件
 * */
const emits = defineEmits(['beforeClose', 'cancel', 'confirm'])

// 对话框关闭之前的回调
const beforeClose = (done) => {
  // 需要执行关闭之前的某些事件
  if (props.isBeforeClose) {
    emits('beforeClose', done)
  } else {
    // 不需要,则直接关闭对话框
    emits('cancel')
  }
}

// 点击'取消'按钮
const cancel = () => {
  emits('cancel')
}

// 点击'确定'按钮
const confirm = () => {
  emits('confirm')
}

</script>

<style lang="scss" scoped>
.dialog-title {
  font-weight: 600;
  font-size: 16px;
  color: #262626;
}
</style>

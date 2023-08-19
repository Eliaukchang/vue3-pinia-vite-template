<template>
  <el-popover :placement="placement" trigger="click" v-model:visible="visible" :popper-style="customClass"
              ref="popoverOptions" @after-leave="handleAfterLeave" @after-enter="handleAfterEnter">
    <div class="options" v-loading="reqLoading">
      <el-input
          class="search-input"
          v-if="isShowInput"
          v-model="searchKeyWord"
          :prefix-icon="Search"
          size="small"
          placeholder="请输入关键词搜索"
          clearable
          @input="inputChange">
      </el-input>
      <div class="options-box">
        <template v-if="isShowOptionsList">
          <div class="no-match" v-if="showNoMatch">无匹配数据</div>
          <div class="options-list" v-else>
            <div v-for="(optionItem, index) in showOptionsList"
                 :key="index"
                 :class="['options-item','options-item' + index, selectedList.includes(optionItem.value) ? 'active' : '']"
                 @click="clickItem(optionItem)">
              <span class="text">{{ optionItem.text }}</span>
              <el-icon v-if="selectedList.includes(optionItem.value)">
                <i-ep-check/>
              </el-icon>
            </div>
          </div>
        </template>
        <div v-else class="no-data">暂无数据</div>
      </div>
      <!-- 多选时显示operation区域 -->
      <div class="operation" v-if="isMultiple && isShowOperation">
        <span>已选择: {{ selectedList.length }}</span>
        <div class="group">
          <el-link type="primary" :underline="false" @click="confirmSelect" :disabled="!selectedList.length">确定
          </el-link>
          <el-link type="primary" class="ml10" :underline="false" @click="clearSelectedList"
                   :disabled="!selectedList.length">清空选择
          </el-link>
        </div>
      </div>
    </div>
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script setup>
import {Search} from '@element-plus/icons-vue'

/**
 *  注释：mounted阶段
 * */
onMounted(() => {
  handleInitData()
});

// 初始化可选择列表optionsList
const handleInitData = () => {
  if (!!props.dataList.length && !props.apiServiceName) {
    // 使用传入组件的固定数据
    optionsList.push(...props.dataList)
  } else if (!!props.apiServiceName) {
    // 发请求获取数据
    // todo
  }
}

/**
 *  注释：props
 * */
const props = defineProps({
  // 外部提供的可选数据
  dataList: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 请求数据的接口名
  apiServiceName: {
    type: String,
    default: ''
  },
  // popover出现的位置，默认底部
  placement: {
    type: String,
    default: 'bottom'
  },
  // popover的宽度，默认300px
  customWidth: {
    type: Number,
    default: 300
  },
  // 是否多选，默认单选
  isMultiple: {
    type: Boolean,
    default: true
  },
  // 是否显示搜索框，默认显示
  showInput: {
    type: Boolean,
    default: true
  },
  // 是否显示底部操作按钮区域，多选时默认显示
  isShowOperation: {
    type: Boolean,
    default: true
  }
})

/**
 *  注释：变量
 * */
const reqLoading = ref(false)
const visible = ref(false)
let searchKeyWord = ref('')
let searchResList = reactive([]) // 已匹配的
const selectedList = reactive([])  // 已选择的
const optionsList = reactive([])  // 数据源

/**
 *  注释：计算属性
 * */
// 展示的源数据与匹配数据
const showOptionsList = computed(() => {
  return !!searchKeyWord.value.length ? searchResList : optionsList
})
// 是否显示可选择项
const isShowOptionsList = computed(() => {
  return !!showOptionsList.value.length;  // optionsList是计算属性得到的，所以需要用.value
})
// 是否显示搜索框
const isShowInput = computed(() => {
  return props.showInput && optionsList.length > 8;
})
// 是否显示'无匹配数据'
let showNoMatch = computed(() => {
  return !!searchKeyWord.value && !searchResList.length;
})
// popover的自定义高度与宽度
const customClass = computed(() => {
  return {
    width: props.customWidth + 'px',
    padding: '0px'
  }
})

/**
 *  注释：接收的自定义事件
 * */
const emits = defineEmits(['handleConfirmSelect'])


// popover隐藏之后，清空搜索数据
const handleAfterLeave = () => {
  searchResList.length = 0
  searchKeyWord.value = ''
}

// popover显示之后，滚动到已选的第一个option位置
const handleAfterEnter = () => {
  if (!selectedList.length) return
  let targetIndex = -1
  if (props.isMultiple) {
    let indexArr = []
    showOptionsList.value.forEach((option, index) => {
      const idx = selectedList.findIndex(item => item === option.value)
      if (idx !== -1) {
        indexArr.push(index)
      }
    })
    targetIndex = Math.min(...indexArr)
  } else {
    targetIndex = showOptionsList.value.findIndex(option => option.value === selectedList[0])
  }
  if (targetIndex === -1) return
  let temp = '.options-item' + targetIndex
  document.querySelector(temp).scrollIntoView({behavior: 'smooth', block: 'center'})
}

// input框change事件，匹配搜索项
const inputChange = (value) => {
  if (!value) {
    searchResList.length = 0
    return
  }
  const temp = optionsList?.filter((item) => {
    return new RegExp(value, 'i').test(item.text);
  })
  searchResList.splice(0, searchResList.length, ...temp)
}

// 点击某一项optionItem
const clickItem = (optionItem) => {
  const index = selectedList.findIndex(value => value === optionItem.value);
  if (!props.isMultiple) {
    // 单选
    if (!!selectedList.length) {
      selectedList.length = 0
    }
    if (index === -1) {
      selectedList.push(optionItem.value)
      confirmSelect()
    }
  } else {
    // 多选
    if (index === -1) {
      selectedList.push(optionItem.value)
      return
    }
    selectedList.splice(index, 1)
  }
}

// 清空已选列表
const clearSelectedList = () => {
  selectedList.length = 0
}

// 触发外部事件
const confirmSelect = () => {
  emits('handleConfirmSelect', selectedList)
  visible.value = false
}

</script>

<style lang="scss" scoped>
.options {
  height: 100%;
  padding: 10px;

  .el-input {
    height: 24px;
    margin-bottom: 5px;
  }

  &-box {
    line-height: 50px;
    min-height: 50px;
    text-align: center;
    overflow: auto;

    .options-list {
      max-height: 240px;

      .options-item {
        height: 20px;
        line-height: 20px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .options-item:hover {
        background-color: #ecf5ff;
      }

      .active {
        color: #409EFF;
      }
    }

    .no-data {
      line-height: 100px;
      text-align: center;
    }
  }

  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    padding: 5px;
  }
}
</style>

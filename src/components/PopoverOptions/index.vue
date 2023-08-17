<template>
  <el-popover :placement="placement" trigger="click" popper-class="popover-options" :popper-style="customClass" ref="popoverOptions" @after-leave="handleAfterLeave">
    <div class="options" v-loading="reqLoading">
      <el-input
          class="search-input"
          v-if="isShowInput"
          v-model.trim="searchKeyWord"
          :prefix-icon="Search"
          size="small"
          placeholder="请输入关键词搜索"
          clearable
          @input="inputChange">
      </el-input>
      <div class="options-box">
        <template v-if="isShowOptionsList">
          <div class="no-match" v-if="noMatch">无匹配数据</div>
          <div class="options-list" v-else>
            <div v-for="(optionItem, index) in optionsList"
                 :key="index"
                 :class="['options-item', selectedList.includes(optionItem.value) ? 'active' : '']"
                 @click="clickItem(optionItem)">
              <span class="text">{{ optionItem.text }}</span>
              <i v-if="selectedList.includes(optionItem.value)" class="el-icon-check"></i>
              <el-icon><i-ep-check /></el-icon>
            </div>
          </div>
        </template>
        <div v-else class="no-data">暂无数据</div>
      </div>
      <!-- 多选时显示operation区域 -->
      <div class="operation" v-if="isMultiple">
        <span>已选择: {{ selectedList.length }}</span>
        <el-link type="primary" :underline="false" @click="clearSelectedList" :disabled="!selectedList.length">清空选择</el-link>
      </div>
    </div>
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
const slots = useSlots();  // 使用过的插槽

onMounted(() => {
  handleInitData()
});


/**
 *  注释：props
 * */
const props = defineProps({
  // popover出现的位置，默认底部
  placement: {
    type: String,
    default: 'bottom'
  },
  // 是否多选，默认单选
  isMultiple: {
    type: Boolean,
    default: false
  },
  // 外部提供的可选数据
  dataList: {
    type: Array,
    default: []
  },
  // 请求数据的接口名
  apiServiceName: {
    type: String,
    default: ''
  },
  // 是否显示搜索框
  showInput: {
    type: Boolean,
    default: true
  },
  // popover的宽度，默认300px
  customWidth: {
    type: Number,
    default: 300
  },
  // popover的高度，默认300px
  customHeight: {
    type: Number,
    default: 300
  }
})

/**
 *  注释：变量
 * */
const reqLoading = ref(false)
const searchKeyWord = ref('')
const showOptionsBox = ref(false)
const selectedList = reactive([]) // 已勾选的
let optionsList = reactive([
    {text: '可选项1', value: 1},
    {text: '可选项2', value: 2},
    {text: '可选项3', value: 3},
    {text: '可选项4', value: 4},
    {text: '可选项5', value: 5},
    {text: '可选项6', value: 6},
    {text: '可选项7', value: 7},
    {text: '可选项8', value: 8},
]) // 可选择的源数据列表

/**
 *  注释：计算属性
 * */
//
const isShowInput = computed(() => {
  return props.showInput && !!optionsList.length;
})
// 是否有匹配数据
const noMatch = computed(() => {
})
// 是否显示可选择项
const isShowOptionsList = computed(() => {
  return !!optionsList.length;
})
// popover的自定义高度与宽度
const customClass = computed(() => {
  return {
    width: props.customWidth + 'px',
    maxHeight: props.customHeight + 'px',
  }
})

// 初始化optionsList
const handleInitData = () => {
  if(!!props.dataList.length && !props.apiServiceName){
    optionsList = JSON.parse(JSON.stringify(props.dataList))
  }else if(!!props.apiServiceName){
    // 发请求获取数据
  }
}

// popover隐藏完毕时的处理
const handleAfterLeave = () => {

}

// input框change事件
const inputChange = () => {

}

// 点击某一项optionItem
const clickItem = (optionItem) => {
  if(!props.isMultiple){
    // 单选
    console.log("optionItem", optionItem)
    const index = selectedList.findIndex(value => value === optionItem.value);
    if(index === -1){
      if(!!selectedList.length){
        selectedList.splice(0, 1)
      }
      selectedList.push(optionItem.value)
    }else{
      selectedList.splice(index, 1)
    }
  }else{
    // 多选
    console.log("optionItem", optionItem)
  }
}

// 清空已选列表
const clearSelectedList = () => {

}

</script>

<style lang="scss" scoped>
.options{

  &-box {
    min-height: 100px;

    .options-list{
      padding: 10px 0px;

      .options-item {
        height: 20px;
        line-height: 20px;
        padding: 5px;
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
}
</style>

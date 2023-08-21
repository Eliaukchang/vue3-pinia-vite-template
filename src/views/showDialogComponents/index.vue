<template>
  <PageTitle/>
  <div class="main-content">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple"/>
        <el-form>
          <el-form-item label="popoverOptions组件："></el-form-item>
          <el-form-item>
            <PopoverOptions :data-list="dataList" @handle-confirm-select="confirmSelect">
              <template #reference>
                <el-input v-model.trim="form.inputData"></el-input>
              </template>
            </PopoverOptions>
          </el-form-item>
        </el-form>
      </el-col>
      <!--      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>-->
      <!--      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>-->
      <!--      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>-->
    </el-row>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import PopoverOptions from "@/components/PopoverOptions/index.vue";
import PageTitle from "@/components/PageTitle/index.vue";

/**
 *  注释：popoverOptions
 * */
const form = reactive({
  inputData: ''
})
// 可选数据源列表
let dataList = reactive([
  {text: '111', value: 1},
  {text: '可选项2', value: 2},
  {text: '可选项3', value: 3},
  {text: '可选项4', value: 4},
  {text: '可选项5', value: 5},
  {text: '可选项6', value: 6},
  {text: '可选项7', value: 7},
  {text: '可选项8', value: 8},
  {text: '可选项9', value: 9},
  {text: '可选项10', value: 10},
  {text: '可选项11', value: 11},
])

const confirmSelect = (arg) => {
  console.log(arg)
}
</script>


<style lang="scss" scoped>
.main-content {
  padding: 20px;
}
</style>

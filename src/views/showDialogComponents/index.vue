<template>
  <PageTitle/>
  <div class="main-content">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple"/>
        <el-form>
          <!--     PopoverOptions     -->
          <el-form-item label="popoverOptions组件："></el-form-item>
          <el-form-item>
            <PopoverOptions :data-list="dataList" @handle-confirm-select="confirmSelect">
              <template #reference>
                <el-input v-model.trim="form.inputData"></el-input>
              </template>
            </PopoverOptions>
          </el-form-item>

          <!--     Dialog     -->
          <el-form-item label="Dialog组件："></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showDialog">打开Dialog</el-button>
            <Dialog :visible="dialogConfig.visible" :custom-width="dialogConfig.customWidth" :title="dialogConfig.title"
                    @confirm="handleConfirm" @cancel="handleCancel">
              <template #footer>
                <el-button @click="customBtnEvent">按钮一</el-button>
                <el-button>按钮二</el-button>
                <el-button type="primary">按钮三</el-button>
              </template>
            </Dialog>
          </el-form-item>

          <!--     UploadDialog     -->
          <el-form-item label="UploadDialog组件："></el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showUploadDialog">打开UploadDialog</el-button>
            <UploadDialog :dialog-config="uploadDialogConfig" @handle-cancel="handleUploadCancel" upload-btn-text="这是一个上传的标题名字"></UploadDialog>
          </el-form-item>

          <span class="iconfont icon-Excel"></span>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import PopoverOptions from "@/components/PopoverOptions/index.vue";
import PageTitle from "@/components/PageTitle/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import UploadDialog from "@/components/UploadDialog/index.vue";

/**
 *  注释：popoverOptions的使用
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

/**
 *  注释：Dialog的使用
 * */
const dialogConfig = reactive({
  visible: false,
  title: '自定义弹窗标题',
  customWidth: '800px',
})
const showDialog = () => {
  dialogConfig.visible = true
}
const handleConfirm = () => {
  dialogConfig.visible = false
}
const handleCancel = () => {
  dialogConfig.visible = false
}
const customBtnEvent = () => {
  console.log("自定义按钮触发的事件")
}

/**
 *  注释：UploadDialog的使用
 * */
const uploadDialogConfig = reactive({
  visible: false,
  title: '上传文件',
})
const showUploadDialog = () => {
  uploadDialogConfig.visible = true
}
const handleUploadCancel = () => {
  uploadDialogConfig.visible = false
}


</script>


<style lang="scss" scoped>
.main-content {
  padding: 20px;
}
</style>

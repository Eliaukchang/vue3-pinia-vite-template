<template>
  <Dialog
      :title="dialogConfig?.title || '导入'"
      :custom-width="dialogConfig?.customWidth || '600px'"
      :visible="dialogConfig?.visible"
      :disabConfirmBtn="disableConfirmBtn || !fileList.length"
      @cancel="cancel"
      @confirm="confirm">
    <div class="upload-box">
      <div class="upload-title">{{ uploadText }}</div>
      <div class="upload-area">
        <el-upload
            ref="upload"
            :accept="acceptFileType.join(',')"
            action="#"
            :multiple="multiple"
            :limit="limit"
            :show-file-list="showFileList"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :http-request="httpRequest"
            :on-success="successUpload">
          <el-button type="primary" :loading="isUploading">
            <el-icon class="el-icon--left"><i-ep-upload/></el-icon>
            {{ uploadBtnText }}
          </el-button>
          <template #tip>
            <div v-if="!fileTypeTip" class="tips-text">说明：请上传{{acceptFileType.join('，') }}后缀的{{ fileTypeIcon }}文件
            </div>
            <div v-else>{{ fileTypeTip }}</div>
          </template>
        </el-upload>
        <div class="file-list-box" v-if="!showFileList">
          <div v-for="item in fileList" :key="item.uid" class="file-item">
            <div class="left">
              <span :class="['iconfont', `icon-${getFileTypeIcon(item.fileType)}`]"></span>
              <div>{{ item.name }}</div>
            </div>
            <el-icon class="icon-close" @click="removeFile(item)"><i-ep-close/></el-icon>
          </div>
        </div>
        <div class="error-area" v-if="errInfo.errorCount > 0">
          导入失败！错误信息{{ errInfo.errorCount }}条。请
          <el-link type="primary" :href="errInfo.errorFilePath + '?filename=错误文件.xlsx'">下载错误文件</el-link>
          查看详情
        </div>
        <!--    自定义上传注意事项区域    -->
        <template slot="custom-tips"></template>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from "@/components/Dialog/index.vue";
import uploadServices from "@/services/modules/uploadServices.js"

/**
 *  注释：props
 * */
const props = defineProps({
  // 弹窗的配置(Dialog的所有配置写在对象中)
  dialogConfig: {
    type: Object,
    default: () => {
    }
  },
  // 导入按钮前的文案
  uploadText: {
    type: String,
    default: '文件：'
  },
  // 文件类型提示文案
  fileTypeTip: {
    type: String,
    default: ''
  },
  // 上传文件时调用的API接口名
  uploadApiName: {
    type: String,
    default: ''
  },
  // 是否显示已上传的文件列表 (目前使用自定义列表)
  showFileList: {
    type: Boolean,
    default: false
  },
  // 可上传的文件类型
  acceptFileType: {
    type: Array,
    default: () => ['.xlsx', '.xls']
  },
  // 文件类型的图标
  // 可传入的值有：excel、word、pdf、image、zip、video、txt
  fileTypeIcon: {
    type: String,
    default: 'excel'
  },
  // 上传文件的最大内存(默认10240kb)
  maxFileSize: {
    type: Number,
    default: 10240
  },
  // 是否是多文件上传，true-多文件，false-单文件
  multiple: {
    type: Boolean,
    default: true
  },
  // 多文件上传时的文件个数
  limit: {
    type: Number,
    default: 3
  },
  // 附加的需要上传的文件参数
  /**  以对象的形式传入参数名 + 参数名对应的值
   *  {
   *    fileType: 1,
   *    paramName1: paramValue1,
   *    paramName2: paramValue2
   *  }
   * */
  fileParams: {
    type: Object,
    default: () => {
      return {};
    }
  }
})

/**
 *  注释：变量
 * */
const fileList = reactive([])
const isUploading = ref(false)
const disableConfirmBtn = ref(false)
const errInfo = reactive({
  errorCount: 0,
  errorFilePath: ''
})
const upload = ref(null) // upload组件实例

/**
 *  注释：computed
 * */
// 上传按钮显示的文案
const uploadBtnText = computed(() => {
  if (!props.multiple && !!fileList.length) {
    return '重新选择';
  }
  if (props.multiple && !!fileList.length) {
    return '继续选择';
  }
  return '选择文件';
})

// 文件类型图标
const fileTypeEnum = {
  '.xls': 'excel',
  '.xlsx': 'excel',
  '.doc': 'word',
  '.docx': 'word',
  '.pdf': 'pdf',
  '.zip': 'zip',
  '.rar': 'zip',
  '.png': 'image',
  '.jpeg': 'image',
  '.jpg': 'image',
  '.gif': 'image',
  '.mp4': 'video',
  '.avi': 'video',
}
const getFileTypeIcon = (type) => {
  console.log("type", type)
  const icon = fileTypeEnum[type]
  console.log("icon", icon)
  if(!!icon){
    return icon
  }else {
    return 'word'
  }
}

/**
 *  注释：emits
 * */
const emits = defineEmits(['successUpload', 'handleCancel'])

/**
 *  注释：methods
 * */

// 上传前触发的事件
const beforeUpload = (file) => {
  console.log('beforeUpload', file);
  // 是否是多文件上传
  if (!props.multiple) {
    fileList.length = 0;
  }
  // 校验文件类型
  const type = file.name.substring(file.name.lastIndexOf('.'));
  console.log('type', type);
  if (!props.acceptFileType.includes(type)) {
    return false;
  }
  // 校验文件大小
  let totalFileSize = 0;
  fileList?.forEach((item) => {
    totalFileSize += item.size / 1000;
  });
  totalFileSize += file.size / 1000;
  if (totalFileSize > props.maxFileSize) {
    // this.$Msg.error(`超过${Math.floor(this.maxFileSize / 1024)}Mb最大上传文件内存`);
    return false;
  }
  // 校验通过，暂存入文件列表
  fileList.push({
    uid: file.uid,
    name: file.name, // 文件名
    size: file.size, // 文件大小
    uploadProcess: 0, // 上传进度
    status: '', // 上传状态
    fileType: type, // 文件类型
    file: file
  });
  errInfo.errorCount = 0;
  errInfo.errorFilePath = '';
}

// 移除文件
const removeFile = (file) => {
  console.log("移除：", file)
  const index = fileList.findIndex((item) => item.uid === file.uid);
  fileList.splice(index, 1);
  if (!fileList.length) {
    errInfo.errorCount = 0;
    errInfo.errorFilePath = '';
  }
  upload.value.clearFiles()
}

//  覆盖默认的上传行为
const httpRequest = ({file}) => {
  console.log('httpRequest', file);
  console.log('successUpload', upload.value);
}

// 上传成功时触发的事件
const successUpload = () => {
}

// 点击取消
const cancel = () => {
  emits('handleCancel');
  resetUpload();
}

// 点击确定，开始上传
const confirm = async () => {
  if(!fileList.length){
    alert("请选择文件")
    return
  }
  disableConfirmBtn.value = true;
  isUploading.value = true;
  try {
    const formData = new FormData();
    if (!props.multiple) {
      formData.append('file', fileList[0].file);
    } else {
      // todo 多选
    }
    // 附加的需要上传的文件参数
    const keys = Object.keys(props.fileParams);
    if (!!keys?.length) {
      for (const key of keys) {
        formData.append(key, props.fileParams[key]);
      }
    }
    // 调用上传接口
    if (!uploadServices[props.uploadApiName]) {
      console.warn('未定义uploadApi');
      return;
    }
    const res = await uploadServices[props.uploadApiName](formData);
    // 是否有错误文件
    if (res?.errorCount > 0) {
      errInfo.errorCount = res?.errorCount;
      errInfo.errorFilePath = res?.errorFilePath;
    } else {
      // this.$Msg.success('上传成功');
      emits('successUpload');
      resetUpload();
      props.dialogConfig.visible = false;
    }
  } catch (e) {
    console.log(e);
  } finally {
    isUploading.value = false;
    disableConfirmBtn.value = false;
  }
}

// 重置上传相关数据
const resetUpload = () => {
  upload.value.clearFiles()
  fileList.length = 0
  errInfo.errorCount = 0
  errInfo.errorFilePath = ''
}

</script>


<style lang="scss" scoped>
.upload-box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 150px;

  .upload-title {
    padding: 8px 10px 0 5px;
  }

  .upload-area {
    flex: 1;

    .tips-text {
      font-size: 14px;
      padding: 10px 0;
    }

    .file-list-box {
      padding-top: 8px;

      .file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        line-height: 30px;
        padding-right: 5px;

        .left {
          display: flex;
          height: 30px;
          align-items: center;

          .iconfont {
            font-size: 24px;
            margin-right: 5px;
          }
        }

        .icon-close {
          display: none;
          padding: 3px;
          cursor: pointer;
        }

        &:hover{
          .icon-close {
            display: inline-block;
          }
        }
      }

      .file-item:hover {
        background-color: #f2f6fc;
      }
    }

    .error-area {
      padding-top: 10px;
      color: #dd1f36;
    }
  }
}
</style>

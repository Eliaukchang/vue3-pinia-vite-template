<template>
  <div class="home">
    <h1>Home页面</h1>
    pinia的counter的值是：{{counter}}
    <br>
    <el-button type="primary" @click="showDialog">显示弹窗</el-button>
    <Dialog :title="dialogConfig.title" :visible="dialogConfig.visible" :customWidth="dialogConfig.customWidth" @cancel="handleCancel" @confirm="handleConfirm"></Dialog>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import {useCounterStore} from "@/stores/modules/counter.js";
import { storeToRefs } from 'pinia'
import Dialog from "@/components/Dialog/index.vue";


const counterStore = useCounterStore();
let { counter } = storeToRefs(counterStore);  // storeToRefs让解构出来的值依然是响应式的
console.log("pinia-counter:", counter)

const dialogConfig = reactive({
  title: '我是弹窗',
  customWidth: '600px',
  visible: false
})

const showDialog = () => {
  dialogConfig.visible = true;
}
const handleCancel = () => {
  dialogConfig.visible = false;
}
const handleConfirm = () => {
  dialogConfig.visible = false;
}

</script>


<style lang="scss" scoped>

</style>

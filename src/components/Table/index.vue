<template>
  <el-table ref="customTable" :data="tableData" :stripe="showStripe" :border="showBorder" style="width: 100%">
    <el-table-column fixed prop="date" label="Date"/>
    <el-table-column prop="name" label="Name"/>
    <el-table-column prop="state" label="State"/>
    <el-table-column prop="city" label="City"/>
    <el-table-column prop="address" label="Address"/>
    <el-table-column prop="zip" label="Zip"/>
  </el-table>
  <hr>
  <el-button type="primary" @click="clickBtn(1)">测试按钮</el-button>
</template>

<script setup>
import {ref} from "vue";

/**
 *  注释：props
 * */
const props = defineProps({
  // 表格数据
  // tableData: {
  //   type: Array,
  //   default: () => {
  //     return []
  //   }
  // },
  // 是否显示斑马纹
  showStripe: {
    type: Boolean,
    default: false
  },
  // 是否显示边框
  showBorder: {
    type: Boolean,
    default: false
  }
})

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  }
])

const customTable = ref(null);  // setup阶段就要去拿页面上的表格DOM元素
const clickBtn = (targetIndex = 1) => {
  const rows = customTable.value.$el.querySelectorAll('.el-table__body .el-table__row');
  rows.forEach((row) => {
    const cells = row.querySelectorAll('.el-table__cell');
    cells.forEach((cell, index) => {
      console.log(index, cell, targetIndex)
      if ((index === targetIndex || index === targetIndex + 1 || index === targetIndex + 2) && targetIndex !== 7) {
        cell.style.backgroundColor = 'red';
      } else if (targetIndex === 7 && index === 7) {
        cell.style.backgroundColor = '#ecf5ff';
      } else {
        cell.style.backgroundColor = '';
      }
    });
  });

}
</script>

<style lang="scss" scoped>

</style>

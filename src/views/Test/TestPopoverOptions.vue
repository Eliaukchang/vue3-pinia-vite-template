<template>
 <div>
   <el-form>
     <el-form-item>
       <PopoverOptions>
         <template #reference>
           <el-input v-model.trim="form.inputData"></el-input>
         </template>
       </PopoverOptions>
     </el-form-item>
   </el-form>
 </div>
</template>

<script setup>
import {reactive} from "vue";
import PopoverOptions from "@/components/PopoverOptions/index.vue";

const form = reactive({
  inputData: ''
})
</script>


<style lang="scss" scoped>

</style>

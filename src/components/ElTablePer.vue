<template>
  <!-- VirtualTable -->

  <el-table
    v-my-scroll="{ dataList, itemHeight: 40 }"
    :data="dataList.slice(start, over)"
    style="width: 100%"
    height="300"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>

  <!-- 瞎几把加载数据 -->

  <!-- <el-table :data="dataList" style="width: 100%" height="300">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table> -->
</template>

<script setup>
// import "element-plus/dist/index.css";
// import { ElMessage } from "element-plus";
import { onMounted, ref, inject, nextTick } from "vue";

const { start, over } = inject("dataListOptions");
console.log(start.value, over.value);

let dataList = ref([]);
let totalRows = 200;
onMounted(() => {
  const now = Date.now();

  setTimeout(() => {
    for (let index = 1; index <= totalRows; index++) {
      dataList.value.push({
        date: "2023-03-05-----" + index,
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      });
    }

    console.log("mock fetch数据请求完成:", Date.now() - now);
    setTimeout(() => {
      console.log(`table渲染${totalRows}行时间：`, Date.now() - now - 1000);
    }, 0);
  }, 1000);
});
</script>

<template>
  <el-table
    v-my-scroll="{ dataList }"
    :data="dataList.slice(start, over)"
    style="width: 100%"
    height="300"
  >
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script setup>
import { onMounted, ref, watch, watchEffect, inject } from "vue";

let dataList = ref([]);

const { start, over } = inject("dataListOptions");
console.log(start.value, over.value);
onMounted(() => {
  setTimeout(() => {
    for (let index = 1; index <= 200; index++) {
      dataList.value.push({
        date: "2023-03-05-----" + index,
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      });
    }
  }, 1000);
});
</script>
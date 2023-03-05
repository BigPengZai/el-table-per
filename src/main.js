import { createApp, watch, ref, computed, watchEffect } from "vue";
import "./style.css";
import App from "./App.vue";
import throttle from "./utils/throttle";
const app = createApp(App);

const start = ref(0);
const over = ref(15);

const padding = ref([]);

let tableHeight = ref(300);
let tableScrollTop = ref(0);
let dataListA = [];
// 在绑定元素的父组件
// 及他自己的所有子节点都挂载完成后调用
app.directive("my-scroll", (el, binding, vnode, prevVnode) => {
  const { dataList } = binding.value;
  dataListA = dataList;
  //   console.log(dataList.length);
  let target = el.querySelector(".el-scrollbar__wrap");
  //事件是否用捕获事件，从外到里，true
  //默认为false:使用冒泡事件，从里到外
  target.addEventListener("scroll", () => {
    // console.log(target.scrollTop, target.clientHeight, target.scrollHeight);
    // console.log("触底");
    // if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
    //   if (over.value >= dataList.length) {
    //     return;
    //   }
    //   over.value += 15;
    // }

    setTimeout(() => {
      let tabel = el.querySelector(".el-table__body");
      tabel.style.paddingTop = padding[0] + "px";
      tabel.style.paddingBottom = padding[1] + 50 + "px";

      tableHeight.value = target.clientHeight;
      tableScrollTop.value = target.scrollTop;
    }, 200);
  });
});
app.provide("dataListOptions", {
  start,
  over,
});
computed(() => {});

watch([tableHeight, tableScrollTop], () => {
  start.value = Math.max(Math.ceil(tableScrollTop.value / 40 - 5), 0);

  over.value = Math.min(
    Math.ceil((tableScrollTop.value + tableHeight.value) / 40 + 5),
    200
  );

  console.log(start.value, over.value);
  let paddingBottom = (dataListA.length - over.value) * 40;
  let paddingTop = start.value * 40;

  padding[0] = paddingTop;
  padding[1] = paddingBottom;
  console.log(padding[0], padding[1]);
});

app.mount("#app");

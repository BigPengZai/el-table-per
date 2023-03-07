import {
  createApp,
  watch,
  ref,
  computed,
  watchEffect,
  nextTick,
  onMounted,
} from "vue";
import "./style.css";
import App from "./App.vue";
import throttle from "./utils/throttle";
const app = createApp(App);

let start = ref(0);
let over = ref(0);
let estimateItemHeight = 40;
const padding = ref([]);
let tableHeight = ref(300);
let tableScrollTop = ref(0);
let estimateDataList = [];
// 偏移量 startOffset，滚动后将渲染区域 偏移到可视区域中
let startOffset = ref(0);
// over.value = start.value + tableHeight.value / estimateItemHeight;
// console.log(over.value, 111);
// 在绑定元素的父组件
// 及他自己的所有子节点都挂载完成后调用
app.directive("my-scroll", (el, binding, vnode, prevVnode) => {
  const { dataList, itemHeight = 40 } = binding.value;
  estimateDataList = dataList;
  estimateItemHeight = itemHeight;

  if (over.value == 0) {
    over.value = start.value + tableHeight.value / estimateItemHeight;
    console.log(over.value);
  }
  //   console.log(dataList.length);
  let target = el.querySelector(".el-scrollbar__wrap");
  let tabel = el.querySelector(".el-table__body");
  target.addEventListener("scroll", () => {
    // console.log(target.scrollTop, target.clientHeight, target.scrollHeight);
    // console.log("触底");
    // if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
    //   if (over.value >= dataList.length) {
    //     return;
    //   }
    //   over.value += 15;
    // }

    nextTick(() => {
      // let tabel = el.querySelector(".el-table__body");

      // console.log("设置padding");
      // tabel.style.paddingTop = padding[0] + "px";
      // tabel.style.paddingBottom = padding[1] + 50 + "px";

      tabel.style.transform = getTransform.value;
      // console.log("设置y轴的偏移量", scrollTop);
      let scrollTop = target?.scrollTop || 0;
      startOffset.value = scrollTop - (scrollTop % estimateItemHeight);
    });

    setTimeout(() => {
      tableHeight.value = target.clientHeight;
      tableScrollTop.value = target.scrollTop;
    }, 200);
  });
});

// start = computed(() => {
//   return Math.max(Math.ceil(tableScrollTop.value / 40 - 5), 0);
// });
// over = computed(() => {
//   let paddingBottom = (dataListA.length - over.value) * 40;
//   let paddingTop = start.value * 40;

//   padding[0] = paddingTop;
//   padding[1] = paddingBottom;
//   if (padding[0] > 7360) return;
//   return Math.min(
//     Math.ceil((tableScrollTop.value + tableHeight.value) / 40 + 5),
//     200
//   );
// });

// 偏移量对应的style
const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`);

// start.value = computed(() => {
//   console.log(tableScrollTop.value);
//   return Math.max(Math.ceil(tableScrollTop.value / estimateItemHeight - 5), 0);
// });
// over.value = computed(() =>
//   Math.min(
//     Math.ceil(
//       (tableScrollTop.value + tableHeight.value) / estimateItemHeight + 5
//     ),
//     estimateDataList.length
//   )
// );
watch([tableHeight, tableScrollTop], () => {
  start.value = Math.max(
    Math.ceil(tableScrollTop.value / estimateItemHeight - 5),
    0
  );
  over.value = Math.min(
    Math.ceil(
      (tableScrollTop.value + tableHeight.value) / estimateItemHeight + 5
    ),
    estimateDataList.length
  );
  // console.log("start:", start.value, "over", over.value);
});

app.provide("dataListOptions", {
  start,
  over,
});

app.mount("#app");

import { computed, ref, watch } from "vue";

export function useDataList() {
  const start = ref(0);
  const over = ref(15);
  watch(over, (newvalue) => {
    console.log("useDataList", newvalue, over.value);
  });
  const aa = computed(() => {
    return over.value;
  });
  const increment = () => (over.value += 15);
  return { start, over, aa, increment };
}

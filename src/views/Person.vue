<!-- 关于ref和computed的使用 -->
<template>
  <div id="person">
    <div>{{ msg }}年龄为{{ age }}</div>
    <button @click="add">+</button>
    <div>年龄的2倍{{ double }}</div>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";
export default {
  setup() {
    // ref将基本类型转为响应式数据，取数据时获取value
    const msg = ref("北鸟南游");
    const age = ref(5);
    // computed 计算属性的使用
    const double = computed(() => {
      return age.value * 2;
    });
    const add = () => {
      age.value += 1;
    };
    return { msg, age, add, double };
  },
};
</script>
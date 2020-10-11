<!-- 关于props的使用 -->
<template>
  <div id="person">
    <PersonInfo :info="msg"></PersonInfo>
    <div>{{ name }}年龄为{{ age }}</div>
    <button @click="add">+</button>
    <div>年龄的2倍{{ double }}</div>
  </div>
</template>
<script lang="ts">
import { computed, reactive, ref, toRefs } from "vue";
import PersonInfo from "../components/PersonInfo.vue";
interface Person {
  name: string;
  age: number;
}
export default {
  components: {
    PersonInfo,
  },
  setup() {
    // 使用reactive将对象转为响应式数据
    const state: Person = reactive({
      name: "北鸟南游",
      age: 5,
      msg: "vue3前端开发",
      double: computed(() => {
        return state.age * 2;
      }),
    });
    const add = () => {
      state.age += 1;
    };
    //toRefs将响应式对象变成普通对象
    return { ...toRefs(state), add };
  },
};
</script>
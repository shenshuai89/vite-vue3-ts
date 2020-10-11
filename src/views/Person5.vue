<!-- 关于watch监听数据的使用 -->
<template>
  <div id="person">
    <PersonInfo :info="msg" @learn="welcome"></PersonInfo>
    <div>{{ name }}年龄为{{ age }}</div>
    <button @click="add">+</button>
    <div>年龄的2倍{{ double }}</div>
  </div>
</template>
<script lang="ts">
import { computed, reactive, ref, toRefs, watch } from "vue";
import PersonInfo from "../components/PersonInfo.vue";
interface Person {
  name: string;
  age: number;
}
export default {
  name: "person",
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
    const welcome = (params: string) => {
      alert("欢迎" + params);
    };
    watch(
      () => state.age,
      (newVal, oldVal, clean) => {
        console.log(
          state.name + "去年:" + oldVal + "岁，今年:" + newVal + "岁。"
        );
        // clean处理重复性的watch监听事件
        clean(() => {
          console.log("clean");
        });
      }
    );
    //toRefs将响应式对象变成普通对象
    return { ...toRefs(state), add, welcome };
  },
};
</script>
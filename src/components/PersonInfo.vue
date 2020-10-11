<!-- 通过setup的第一个参数props，接收到父组件传递的值 -->
<!-- 通过setup的第二个参数是一个上下文对象，包含了一些有用的属性如slot、attrs、emit -->
<template>
  <div>描述：{{ data }}</div>
  <button @click="emitName">开心学习!</button>
</template>
​
<script>
import { ref } from "vue";
export default {
  props: {
    info: String,
  },
  setup(props, context) {
    //利用 setup 的第一个参数获取 props 使用
    // console.log(props);
    const data = ref(props.info);
    // 子组件向父组件发送事件
    const emitName = () => {
      context.emit("learn", "学习vue3");
    };
    return { data, emitName };
  },
};
</script>
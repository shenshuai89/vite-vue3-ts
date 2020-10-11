<template>
  <h1>这是count组件</h1>
  <button @click="inc">+count{{ count }}</button>
  <button @click="inc(2)">每次加2</button>

  <button @click="dec">-</button>
  <button @click="reset">重置</button>
</template>

<script lang="ts">
import { ref } from "vue";
import useCount from "../hooks/useCount";

export default {
  name: "CountDemo",
  props: {
    msg: String,
  },
  setup() {
    const { current: count, inc, dec, set, reset } = useCount(2, {
      min: 1,
      max: 15,
    });
    const msg = ref("Demo useCount");

    return {
      count,
      inc,
      dec,
      set,
      reset,
      msg,
    };
  },
};
</script>
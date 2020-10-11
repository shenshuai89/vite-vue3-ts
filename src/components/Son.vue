<template>
  <div>
    <h3 :style="{ color: color }">son 组件</h3>
    <Grandson></Grandson>
  </div>
</template> 
 
<script lang="ts">
import { inject } from "vue";
import Grandson from "./Grandson.vue";
export default {
  components: {
    Grandson: Grandson,
  },
  setup() {
    const color = inject("themecolor");
    return {
      color,
    };
  },
};
</script> 
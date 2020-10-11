<template>
  <div>
    <h5 :style="{ color: color }">grandson 组件</h5>
  </div>
</template> 
 
<script lang="ts">
import { inject } from "vue";
export default {
  name: "grandson",
  setup() {
    const color = inject("themecolor");
    return {
      color,
    };
  },
};
</script> 
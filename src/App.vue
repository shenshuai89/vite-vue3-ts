<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <Count></Count>
  <hr />
  <Person></Person>
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Count from "./views/Count.vue";
// import Person from "./views/Person.vue";
// import Person from "./views/Person2.vue";
// import Person from "./views/Person3.vue";
// import Person from "./views/Person4.vue";
import Person from "./views/Person5.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Count,
    Person,
  },
};
</script>

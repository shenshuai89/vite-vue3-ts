<template>
  <HelloWorld msg="北鸟南游 Vue 3.0 + Vite + typescript" />
  <Count></Count>
  <hr />
  <Person></Person>
  <hr>
  <p>依赖注入</p>
  <Son></Son>
  <hr>
  <div id="nav">
    <router-link to="/">count</router-link> |
    <router-link to="/todolist">todolist</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import {provide } from "vue"
import HelloWorld from "./components/HelloWorld.vue";
import Count from "./views/Count.vue";
// import Person from "./views/Person.vue";
// import Person from "./views/Person2.vue";
// import Person from "./views/Person3.vue";
// import Person from "./views/Person4.vue";
import Person from "./views/Person5.vue";
// 依赖注入
import Son from "./components/Son.vue"

export default {
  name: "App",
  components: {
    HelloWorld,
    Count,
    Person,
    Son
  },
  setup() { 
    provide('themecolor', 'orange') 
  } 
};
</script>

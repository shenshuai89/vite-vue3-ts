使用vite工具搭建项目
技术栈：vite+vue3+typescript
## vite vue3 typescript

## 项目搭建
>> 官方推荐两种方式安装
- vite
  npm init vite-app vite-vue3-ts # OR yarn create vite-app vite-vue3-ts
- cli
  npm install -g @vue/cli # OR yarn global add @vue/cli
  vue create vite-vue3-ts
### 安装依赖
 yarn 
#### 使用yarn启动项目
yarn dev

### 引入typescript
#### 安装
yarn add typescript -D

#### 初始化tsconfig.json
npx tsc --init
将main.js修改为main.ts,同时将index.html里面的引用也修改为main.ts,
然后在script 里添加 lang="ts"

#### 由于ts无法识别vue文件，还需要配置一个文件
在项目根目录添加shim.d.ts文件
declare module "*.vue" {
  import { Component } from "vue";
  const component: Component;
  export default component;
}

## Composition API风格

在 `vue3` 的 `Composition API` 代码风格中，比较有代表性的api就是 `ref` 和 `reactive` 

### ref和computed

- ref将基本类型转为响应式数据，取数据时获取value
- computed计算属性数据，缓存的数据

```
import { computed, ref } from "vue";
export default {
  setup() {
    
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
```

### reactive和toRefs

- reactive将对象转为响应式数据
- toRefs将响应式对象变成普通对象

```
import { computed, reactive, ref, toRefs } from "vue";
interface Person {
  name: string;
  age: number;
}
export default {
  setup() {
    // 使用reactive将对象转为响应式数据
    const state: Person = reactive({
      name: "北鸟南游",
      age: 5,
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
```

### props和context父子组件 属性传递

代码文件

- views/person3.vue
- views/person4.vue
- components/PersonInfo.vue

```
<!-- 父组件 -->
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
<!-- 子组件 -->
  <template>
  <div>描述：{{ data }}</div>
  <button @click="emitName">开心学习!</button>
</template>
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
```

### watch监听数据变化

watch监听state的age数据变化

```
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
```

watch监听ref

1. 不指定数据源

```
const age = ref(18)
watch(()=>{
    console.log(age.value)
})
```

1. 指定数据源

```
const age = ref(18)
watch(age,()=> {
    console.log(age.value)
})
```



watch监听reactive

```
const state: Person = reactive({
  name: "北鸟南游",
  age: 5,
  msg: "vue3前端开发",
  double: computed(() => {
  return state.age * 2;
  }),
});
```

1. 不指定数据源

```
watch(()=>{
    console.log(state.age)
})
```

1. 指定数据源

```
watch(()=>state.age,()=>{
    console.log(state.age)
})
```



### provide、inject依赖注入数据

代码参考文件

- components/Son.vue
- components/Grandson.vue
- App.vue

App.vue

```
import Son from "./components/Son.vue"
export default {
  setup() { 
    provide('themecolor', 'orange') 
  } 
};
```

Son.vue

```
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
```

Grandson.vue

```
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
```

provide和inject的使用对有层级关系的组件，可以跨组件进行数据传递

## 添加router

### 安装vue-router

```
yarn add vue-router@latest
```

### 配置vue-router

在项目`src`目录下面新建`router`目录，然后添加`index.ts`文件

```
import {createRouter, createWebHashHistory} from 'vue-router'
// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: []
})
```

## 添加vuex

### 安装vuex

yarn add vuex@latest

在项目`src`目录下面新建`store`目录，并添加`index.ts`文件

```
import { createStore } from "vuex";
interface State {
  userName: string;
  taskList: any[];
}
export default createStore({
  state: {
    userName: "北鸟南游",
    taskList: [],
  },
  getters: {
    totalList(state: State) {
      return state.taskList.length;
    },
    completeList(state: State) {
      return state.taskList.filter((list) => {
        return list.isfinished == true;
      }).length;
    },
  },
  mutations: {
    createTask(state: State, newTask: string) {
      state.taskList.push(newTask);
    },
    deleteTask(state: State, index: number) {
      state.taskList.splice(index, 1);
    },
    updateStatus(state: State, payload: any) {
      const { index, status } = payload;
      state.taskList[index].isfinished = status;
    },
  },
});
```

在main.ts中引入router和vuex

```
import router from "./router/index";
import vuex from "./store/index";

createApp(App).use(router).use(vuex).mount("#app");
```

## 项目todolist

集成路由和vuex数据管理

使用了scss预处理器，安装sass，yarn add sass -D

app.vue

```
<div id="nav">
  <router-link to="/">count</router-link> |
    <router-link to="/todolist">todolist</router-link>
</div>
<router-view />
```

router/index.ts

```
import { createRouter, createWebHashHistory } from "vue-router";
// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: [
    {
      path: "/",
      // 必须添加.vue后缀
      component: () => import("../views/Count.vue"),
    },
    {
      path: "/todolist",
      name: "todolist",
      component: () => import("../views/TodoList.vue"),
    },
  ],
});
```

store/index.ts

```
import { createStore } from "vuex";
interface State {
  userName: string;
  taskList: any[];
}
export default createStore({
  state: {
    userName: "北鸟南游",
    taskList: [],
  },
  getters: {
    totalList(state: State) {
      return state.taskList.length;
    },
    completeList(state: State) {
      return state.taskList.filter((list) => {
        return list.isfinished == true;
      }).length;
    },
  },
  mutations: {
    createTask(state: State, newTask: string) {
      state.taskList.push(newTask);
    },
    deleteTask(state: State, index: number) {
      state.taskList.splice(index, 1);
    },
    updateStatus(state: State, payload: any) {
      const { index, status } = payload;
      state.taskList[index].isfinished = status;
    },
  },
});
```


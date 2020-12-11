
### composition-api
```js
<script>
import { reactive } from "vue";
export default {
  setup() {
    // 使用抽离后的移除逻辑
    let { state, handleDelete } = useRemoveStudent();
    // 使用抽离后的新增逻辑
    let { handleAdd } = useAddStudent(state);

    // 将数据和方法返回，暴露给模板使用
    return {
      state,
      handleDelete,
      handleAdd,
    };
  },
};
// 移除功能的逻辑-----------------------------
function useRemoveStudent() {
  // 创建响应式初始数据
  let state = reactive({
    students: [
      { id: 1, name: "张三", age: 10 },
      { id: 2, name: "李四", age: 11 },
      { id: 3, name: "王五", age: 12 },
    ],
    stu: {},
  });

  // 删除方法
  function handleDelete(i) {
    state.students = state.students.filter((item, index) => index != i);
  }

  return {
    state,
    handleDelete,
  };
}

// 新增功能的逻辑------------------------------
function useAddStudent(state) {
  // 添加方法
  function handleAdd(e) {
    e.preventDefault();
    state.students.push(state.stu);
    state.stu = {};
  }
  return {
    handleAdd,
  };
}
</script>
```


### vue2
```js
<template>
  <div class="home">
    <form>
      <input type="text" v-model="stu.id" />
      <input type="text" v-model="stu.name" />
      <input type="text" v-model="stu.age" />
      <button type="submit" @click="handleAdd">添加</button>
    </form>
    <ul>
      <li v-for="(item, index) in students" :key="item.id">
        {{ item.name }}，{{ item.age }}岁，
        <button @click="handleDelete(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [
        { id: 1, name: "张三", age: 10 },
        { id: 2, name: "李四", age: 11 },
        { id: 3, name: "王五", age: 12 },
      ],
      stu: {},
    };
  },
  methods: {
    handleDelete(i) {
      this.students = this.students.filter((item, index) => index != i);
    },
    handleAdd(e) {
      e.preventDefault();
      this.students.push(this.stu);
      this.stu = {};
    },
  },
};
</script>
```


### vue3
```js
<template>
  <form>
    <input type="text" v-model="state.stu.id" />
    <input type="text" v-model="state.stu.name" />
    <input type="text" v-model="state.stu.age" />
    <button type="submit" @click="handleAdd">添加</button>
  </form>
  <ul>
    <li v-for="(item, index) in state.students" :key="item.id">
      {{ item.name }}，{{ item.age }}岁，
      <button @click="handleDelete(index)">删除</button>
    </li>
  </ul>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    // 创建响应式初始数据
    let state = reactive({
      students: [
        { id: 1, name: "张三", age: 10 },
        { id: 2, name: "李四", age: 11 },
        { id: 3, name: "王五", age: 12 },
      ],
      stu: {},
    });

    // 删除方法
    function handleDelete(i) {
      state.students = state.students.filter((item, index) => index != i);
    }

    // 添加方法
    function handleAdd(e) {
      e.preventDefault();
      state.students.push(state.stu);
      state.stu = {};
    }

    // 将数据和方法返回，暴露给模板使用
    return {
      state,
      handleDelete,
      handleAdd,
    };
  },
};
</script>
```
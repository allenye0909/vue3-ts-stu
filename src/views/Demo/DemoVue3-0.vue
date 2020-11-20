<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-20 09:38:46
 * @LastEditTime: 2020-11-20 15:30:24
-->
<template>
  <div>
    <h3>VUE-3</h3>
    <div>
      <input type="text" v-model="data.stu.id" />
      <input type="text" v-model="data.stu.name" />
      <input type="text" v-model="data.stu.age" />
      <button @click="handleAdd">添加</button>
    </div>
    <ul>
      <li v-for="(item, index) in data.students" :key="item.id">
        <span class="mr60">编号：{{ item.id }},</span>
        <span class="mr60">姓名：{{ item.name }}，</span>
        <span class="">年龄：{{ item.age }}岁，</span>
        <button @click="handleDelete(index)">删除</button>
      </li>
    </ul>
    <h5>
      <h6>reactive</h6>
      <button @click="handelTestAdd">-测试添加-</button>
      <p>{{ data.students }}</p>
      <p>{{ data.stu }}</p>

      <hr />
      <h5>toRefs</h5>
      <p>{{ students }}</p>
      <p>{{stu}}</p>
    </h5>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const { data, handleDelete, handleAdd, handelTestAdd } = handelForm();
    return {
      data,
      ...toRefs(data),
      handleAdd,
      handleDelete,
      handelTestAdd
    };
  }
};

function handelForm() {
  let data = reactive({
    students: [
      { id: 1, name: "张三", age: 10 },
      { id: 2, name: "李四", age: 11 },
      { id: 3, name: "王五", age: 12 }
    ],
    stu: {}
  });

  function handleAdd(): void {
    if (JSON.stringify(data.stu) === "{}") return alert("添加为空");
    data.students.push(JSON.parse(JSON.stringify(data.stu)));
    data.stu = {};
  }

  function handleDelete(index: number): void {
    data.students.splice(index, 1);
  }

  function handelTestAdd() {
    data.students.push({
      id: Math.floor(Math.random() * 100),
      name: "王五" + Math.floor(Math.random() * 10),
      age: Math.floor(Math.random() * 30)
    });
  }
  return {
    data,
    handleAdd,
    handelTestAdd,
    handleDelete
  };
}
</script>

<style scoped>
.mr60 {
  margin-right: 60px;
}
</style>

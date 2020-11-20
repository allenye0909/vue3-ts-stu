<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-20 09:38:46
 * @LastEditTime: 2020-11-20 09:48:18
-->
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
        { id: 3, name: "王五", age: 12 }
      ],
      stu: {}
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
    }
  }
};
</script>

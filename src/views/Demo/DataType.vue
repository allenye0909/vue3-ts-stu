<!--
 * @Description: 数据类型
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 09:10:29
 * @LastEditTime: 2020-11-18 14:33:51
-->
<template>
  <div>
    <h1>数据类型</h1>
    <button @click="handelClick">XXX</button>
    <p>data:{{ JSON.stringify(data) }}</p>
    <!-- <p>refData:{{ JSON.stringify(refData) }}</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, onMounted } from "vue";
interface Person {
  name: string;
  sex: string;
  age: number;
  list: number[];
}

interface DataProps {
  id: number;
  girls: string[];
  girlsNum: number;
  girlsFun: (item: number) => void;
}

export default defineComponent({
  setup() {
    let num: number = 8;

    const uname: string = "allen";

    const list: string[] = ["1", "list"];
    const list2: number[] = [123, 34, 6];
    const list3: any[] = [{ uname: num }, [132, 4], 0, "test"];

    const person1: Person = {
      name: "allen",
      sex: "男",
      age: 12,
      list: [123, 54, 65]
    };

    const data: DataProps = reactive({
      girls: ["lili", "hihi"],
      girlsNum: 0,
      id: 0,
      girlsFun: (item: number) => {}
    });

    const handelClick = () => {
      data.id++;
      data.girlsNum = data.girls.length;
    };
    const handelObj = () => {};
    onMounted(() => {
      console.log(">>>");
      console.log(num, uname, list, list2, list3);
      console.log(person1);
    });

    const refData = toRefs(data);

    console.log("refData:", refData);

    return {
      handelClick,
      handelObj,
      ...refData,
      data
    };
  }
});
</script>

<style></style>

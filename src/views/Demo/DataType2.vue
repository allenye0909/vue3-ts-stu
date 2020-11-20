<!--
 * @Description: 数据类型
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 09:10:29
 * @LastEditTime: 2020-11-18 15:50:29
-->
<template>
  <div>
    <h1>数据类型-对象数据类型</h1>
    <button @click="handelClick">XX</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  reactive,
  onMounted,
  computed
} from "vue";
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
    const obj: {
      name: string;
      age: number;
    } = {
      name: "allen",
      age: 123
    };

    class Person {
      "name_": string;
      "age": number;
    }
    const fun1: Person = { name_: "allen", age: 12 };

    // ?是一个函数 并且 返回值是一个字符串
    //const fun            = () => {}
    const fun: () => number = () => {
      return 0;
    };

    console.log(fun());

    let count: number;
    count = 123;
    console.log(count, "count");

    const handelClick = () => {
      console.log(fun1);
      console.log("obj", obj);
      obj.age++;
    };
    const handelObj = () => {};
    onMounted(() => {});

    //////////////////////////////////////////////
    ////// 这种情况是可以自己检测到数据类型///////
    //////////////////////////////////////////////
    const one = 1;
    const two = 2;
    const three = one + two;
    console.log(three, "typeof", typeof three);

    //! 在return 中加了一个空字符串 total1 就变成了string 类型
    function getTotal(one: number, two: number): string {
      return one + two + "";
    }
    const total = getTotal(1, 2);
    console.log(total, "typeof", typeof total);
    //////////////////////////////////////////////

    return {
      handelClick,
      handelObj
    };
  }
});
</script>

<style></style>

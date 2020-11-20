<!--
 * @Description: 数据类型
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 09:10:29
 * @LastEditTime: 2020-11-19 13:39:01
-->
<template>
  <div>
    <h1>数据类型-函数</h1>
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
    const handelClick = () => {};
    const handelObj = () => {};
    onMounted(() => {});

    // * 空的一个方法 也要声明一个空类型
    function say(): void {
      console.log("hi~~");
    }
    say();

    function errorFun(): number {
      // throw new Error();
      console.log("Hello World");
      return 2;
    }

    console.log(errorFun());

    enum Color {
      ONE,
      TWO,
      THREE
    }

    let c: Color = Color.TWO;

    console.log(c, Color[2], ">>>>>");

    let state: any = null;
    console.log(state);

    let unusable: void = undefined;

    console.log(unusable);

    //////////////////////////////////////////////
    ////// 这种情况是可以自己检测到数据类型///////
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    // 返回never的函数必须存在无法达到的终点
    // function error(message: string): never {
    //   throw new Error(message);
    // }

    // error("我错了...");

    function f({ a = "", b = 0 } = {}): void {
      // ...
    }
    console.log(f({ a: "", b: 9 })); // undefined

    return {
      handelClick,
      handelObj
    };
  }
});
</script>

<style></style>

<!--
 * @Description: 数据类型
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 09:10:29
 * @LastEditTime: 2020-11-19 17:34:36
-->
<template>
  <div>
    <h1>接口-函数类型</h1>
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

    interface SearchFunc {
      // 两个参数且返回 return boolean
      (source: string, subString: string): boolean; // 参数列表和返回值类型
    }

    // let mySearch: SearchFunc;
    // mySearch = function(source: string, subString: string) {
    //   let result = source.search(subString);
    //   return result > -1;
    // };

    // let mySearch: SearchFunc;
    // // 函数的参数名不需要与接口里定义的名字相匹配
    // mySearch = function(src: string, sub: string): boolean {
    //   let result = src.search(sub);
    //   return result > -1;
    // };

    let mySearch: SearchFunc;
    mySearch = function(src, sub) {
      let result = src.search(sub);
      return result > -1;
    };

    console.log(mySearch("wwwww", "wwwww"));

    // let myAdd = function(x: number, y: number): number {
    //   return x + y;
    // };
    // 函数类型包含两部分：参数类型和返回值类型。

    // ? 为可选参数
    let myAdd: (x: number, y?: number) => number = function(
      x: number,
      y?: number
    ): number {
      if (y) {
        return x + y;
      }
      return x;
    };

    console.log(myAdd(22, 44));



    // 所有参数收集到一个变量里
    function buildName(firstName: string, ...restOfName: any[]) {
      console.log(firstName, restOfName);
      return firstName + " " + restOfName.join(" ");
    }

    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

    console.log(employeeName);

    return {
      handelClick,
      handelObj
    };
  }
});
</script>

<style></style>

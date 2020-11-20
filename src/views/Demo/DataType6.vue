<!--
 * @Description: 数据类型
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 09:10:29
 * @LastEditTime: 2020-11-20 09:24:33
-->
<template>
  <div>
    <h1>接口-this</h1>
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

import * as VUE from "vue"
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

    let desk = {
      name: "allen",
      say: function(username: number): string {
        console.log(this);
        return `${this.name}->${username}+++++${JSON.stringify(this)}`;
      }
    };

    console.log(desk.say(22));

    function ddoo(data: string): any {
      return data;
    }

    console.log(ddoo("sdfsd"));

    function identity<T>(arg: T): T {
      return arg;
    }

    console.log(identity([123]));

    console.log(VUE, "vue")

    return {
      handelClick,
      handelObj
    };
  }
});
</script>

<style></style>

<!--
 * @Description: 数据类型
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-18 09:10:29
 * @LastEditTime: 2020-11-19 15:07:52
-->
<template>
  <div>
    <h1>接口</h1>
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
    const handelClick = () => {
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig) {
        let newSquare = { color: "white", area: 100 }; // 默认值

        // 如果传值则用传值数据
        if (config.color) {
          newSquare.color = config.color;
        }
        if (config.width) {
          newSquare.area = config.width * config.width;
        }
        return newSquare;
      }

      let mySquare = createSquare({ color: "black" });

      console.log(mySquare);

      // 只读属性
      interface Readonly {
        readonly x: number;
        readonly y: number;
      }

      let positon: Readonly = { x: 10, y: 90 };
      console.log(positon);
    };
    const handelObj = () => {};
    onMounted(() => {});

    interface LabelValue {
      label: string;
      color?: string;
    }

    function printLabel(labelledObj: LabelValue) {
      // label必须为 string 且整个对象赋值给 labelledObj
      console.log(labelledObj);
    }

    let myObj = { size: 10, label: "Size 10 Object" };
    printLabel(myObj);

    interface SquareConfig {
      color?: string;
      width?: number;
      [propName: string]: any; // 添加一个字符串索引签名
    }

    function createSquare(config: SquareConfig) {
      console.log(config);
      // ...
    }

    let mySquare = createSquare({ cwwlor: "red", wideth: 100 }); // 跳过这些检查的方式
    // let mySquare = createSquare({ width: 100, opacity: 0.5 } );
    return {
      handelClick,
      handelObj
    };
  }
});
</script>

<style></style>

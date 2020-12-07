<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-30 14:24:14
 * @LastEditTime: 2020-12-07 09:35:51
-->
<template>
  <div>
    技术胖1
    <a-button type="primary">
      Primary
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
export default defineComponent({
  setup() {
    class People {}
    let user: People = new People();

    const test2 = () => {};

    const test: () => void = () => {};

    function say(): string[] {
      return [];
    }

    type Value = [] | object | string | number; // 类型别名

    let Oarr: Value[] = [[], {}, "aaa", 12];

    type User = {
      name: string;
      age: number;
      say: object;
    };

    let user_: User = {
      name: "allen",
      age: 12,
      say: Object,
    };

    // console.log(user_)

    type Girl = {
      name: string;
      age: number;
    };

    const user1: Girl[] = [
      { name: "12", age: 12 },
      { name: "12", age: 12 },
    ];

    // console.log(user1)

    let user2: (object | number | string | null | undefined)[] = [
      1,
      "12",
      {},
      [],
      null,
      undefined,
    ];

    let user3: [number, string, object, [], null, undefined] = [
      1,
      "12",
      {},
      [],
      null,
      undefined,
    ];

    // interface

    // interface Girls {
    //   name: string;
    //   age: number;
    //   sex?: string
    // }

    // const resume = (girl: Girls) => {
    //   girl.age > 18 && console.log(girl.name + "--通过面试 - " + girl. sex);
    //   girl.age < 18 && console.log(girl.name + "--年龄太小 - " + girl. sex);
    // };

    // resume({ name: "allen", age: 12});

    // interface-----2
    interface Girls {
      name: string;
      age: number;
      sex?: string;
      [propname: string]: any;
      say(): string; // 方法,返回 string
    }

    // 继承
    interface Teacher extends Girls {
      teach(): string;
    }

    const girl2: Girls = {
      name: "allen",
      age: 12,
      sex: "男",
      sdfsdfsdf: 12,
      asdsdf: 12,
      say() {
        return "this.name";
      },
    };
    // console.log(girl2);

    // class------------------

    class Lady {
      content = "hi";
      say() {
        return this.content;
      }
    }

    // 继承类
    class Xiaojiejie extends Lady {
      // 重写   使用 super 关键字
      say() {
        return super.say() + ", i love u";
      }
      run() {
        return this.content + "--run";
      }
    }

    let girl3 = new Xiaojiejie();

    // console.log(girl3.run());
    // console.log(girl3.say());

    class Greeter {
      greeting: string;
      constructor(message: string) {
        this.greeting = message;
        console.log();
      }
      // greet() {
      //   return "Hello, " + this.greeting;
      // }
    }
  },
});
</script>

<style></style>

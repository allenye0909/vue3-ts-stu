<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-30 14:24:14
 * @LastEditTime: 2020-12-04 10:01:13
-->
<template>
  <div>
    泛型
    <button @click="handelClick">点击</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
export default defineComponent({
  props: {
    height: {
      type: Number as PropType<number>,
      default: 360,
    },
    value: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const list = [{ a: 1 }, { a: 2 }, { a: 4 }];
    // const result = find(list, (item, index) => item.a === 2);
    const result = _find(list, (item, index) => item.a === 2);

    interface GetNumber {}
    console.log(result);
    const height = result.height;

    console.log(props, ctx);

    let requestAnimationFrame: typeof window.requestAnimationFrame;
    requestAnimationFrame = window.requestAnimationFrame;

    console.log(requestAnimationFrame);

    function handelClick<T>(event: Event): void {
      console.log(event);
      console.log(es6Unique([{ name: 12 }, { name: 12 }, { name: 123 }]));
    }

    function es6Unique<G>(arr: G[]): G[] {
      return Array.from(new Set(arr));
    }

    let people: People = {
      name: "string",
      age: 12,
      // say: function():void {
      //   console.log(123);
      // },
    };
    console.log(people);

    let deck: Deck = {
      suits: ["hearts", "spades", "clubs", "diamonds"],
      cards: Array(52),
      // NOTE: The function now explicitly specifies that its callee must be of type Deck
      createCardPicker: function(this: Deck) {
        return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        };
      },
    };

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    // alert("card: " + pickedCard.card + " of " + pickedCard.suit);

    const tableElRef = ref<ComponentRef>(null);
    console.log(tableElRef, ">>>>>");

    interface User {
      name: string,
      age: number
    }

    let user :User = {
      name: "allen",
      age: 123
    }

    let count: number = 12.2134234;
    console.log(count.toFixed(3), "{{{")
    

    return {
      height,
      handelClick,
    };
  },
});

// 使用泛型
function find<T>(
  items: T[],
  callback: (item: T, index: number) => boolean
): T | undefined {
  for (let i = 0, length = items.length; i < length; i++) {
    if (!items[i]) continue;
    if (callback(items[i], i)) {
      return items[i];
    }
  }
}

// 不适用泛型
function _find(
  items: any[],
  callback: (item: any, index: number) => boolean
): any {
  for (let i = 0, length = items.length; i < length; i++) {
    if (callback(items[i], i)) {
      return items[i];
    }
  }
}

function test<T = number>(arg: T): T | void {
  return arg;
}

const a = test("-");

interface Result<T = Object | string> {
  code: number;
  type: string;
  message: string;
  result: T;
}

const obj = {
  code: 1,
  type: "success",
  message: "string",
  result: {},
};

const obj2 = {
  code: "00",
  // type: "success",
  // message: "string",
  result: {},
};

console.log(obj, ">...");

function handelResult(opts: Result): Result {
  return opts;
}

function fanxing<T>(opts: Result | T): any {
  return { ...opts, ...{ name: "allen" } };
}

console.log("handelResult", handelResult(obj));
console.log("fanxing", fanxing(obj2));
</script>

<style></style>

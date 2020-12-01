<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-30 14:24:14
 * @LastEditTime: 2020-11-30 15:11:39
-->
<template>
  <div>
    泛型
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const list = [{ a: 1 }, { a: 2 }, { a: 4 }, null];
    // const result = find(list, (item, index) => item.a === 2);
    const result = _find(list, (item, index) => item.a === 2);
    console.log(result);
  },
});

// 使用泛型
function find<T>(items: T[], callback: (item: T, index: number) => boolean): T {
  for (let i = 0, length = items.length; i < length; i++) {
    if (!items[i]) continue;
    if (callback(items[i], i)) {
      return items[i];
    }
  }
}

// 不适用泛型
function _find(items: any[], callback: (item: any, index: number) => boolean): any {
  for (let i = 0, length = items.length; i < length; i++) {
    if (callback(items[i], i)) {
      return items[i]
    }
  }
}

const items = [{ a: 1 }, { a: 2 }, { a: 4 }, null ]
const result = find(items, (item, index) => item.a === 2)
</script>

<style></style>

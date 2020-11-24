<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-24 15:10:03
 * @LastEditTime: 2020-11-24 15:30:53
-->
<template>
  <div>
    $refs
    <div v-for="item in list" :ref="setItemRef" :key="item">{{ item }}</div>
    <p>list{{ list }}</p>
  </div>
</template>

<script>
import {
  ref,
  onBeforeUpdate,
  onUpdated,
  reactive,
  toRefs,
  onMounted,
} from "vue";

export default {
  setup() {
    let itemRefs = [];
    const data = reactive({
      list: [1, 23, 4, 5, 6, 7, 7],
    });
    const setItemRef = (el) => {
      itemRefs.push(el);
    };
    onBeforeUpdate(() => {
      itemRefs = [];
    });
    onUpdated(() => {
      console.log(itemRefs, "onUpdated");
    });

    onMounted(() => {
      console.log(itemRefs, "onMounted");
    });

    return {
      ...toRefs(data),
      itemRefs,
      setItemRef,
    };
  },
};
</script>

<style></style>

<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-17 15:20:25
 * @LastEditTime: 2020-11-17 17:22:06
-->
<template>
  <div>
    <button @click="handelClick">XX</button>
    <p>{{ state.count }}</p>
    <p>{{ state.double }}</p>
    <p>{{showNewFolder}}</p>
    <p>{{num}}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  onMounted,
  onBeforeUpdate
} from "vue";
export default defineComponent({
  // methods: {
  //   handelClick() {
  //     console.log(123);
  //   }
  // },
  setup(a, b) {
    interface book {
      count: Number;
    }
    const showNewFolder = ref(false)
    const num:any = ref("0")
    const state: any = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    });
    const handelClick = () => {
      state.count++;
      showNewFolder.value = !showNewFolder.value
      num.value = state.count * 3
    };
    onMounted(() => {
      console.log("onMounted");
      handelClick();
    });
    onBeforeUpdate(() => {
      console.log("4-组件更新之前执行");
    });
    return {
      showNewFolder,
      handelClick,
      state,
      num
    };
  }
});
</script>

<style></style>

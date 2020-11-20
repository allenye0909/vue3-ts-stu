<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-17 16:25:19
 * @LastEditTime: 2020-11-17 17:07:08
-->
<template>
  <div>
     <h2>lifehook</h2>
     <dir>12</dir>
  </div>
</template>

<script lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from "vue";
export default {
  setup() {
    // onBeforeMount(event => {
    //   console.log(event);
    // });
    // onMounted((x: any) => {

    // })
    onRenderTracked(event => {
      console.log(
        "状态跟踪钩子函数  在4-5中间执行，页面每一个状态值都会打印",
        event
      );
    });
    onRenderTriggered(event => {
      console.log(
        event,
        "在4之前执行,和上一个钩子函数的区别是，上一个会打印所有的状态值，这个只是会打印当前改变的状态值！"
      );
    });
    // 生命周期钩子函数
    onBeforeMount(() => {
      console.log("2-组件挂载到页面之前执行");
    });
    onMounted(() => {
      console.log("3-页面挂载到页面之后执行");
    });
    onBeforeUpdate(() => {
      console.log("4-组件更新之前执行");
    });
    onUpdated(() => {
      console.log("5-组件更新之后执行");
    });
    onBeforeUnmount(() => {
      console.log("组件卸载之前执行");
    });
    onUnmounted(() => {
      console.log("组件卸载之后执行");
    });
    onActivated(() => {
      console.log("在<keep-laive>中独有的构造函数 被激活时执行");
    });
    onDeactivated(() => {
      console.log("A组件切换到B，A组件消失时执行");
    });
    onErrorCaptured(() => {
      console.log("当捕获一个来自子孙组件的异常时激活钩子函数");
    });
  }
};
</script>

<style></style>

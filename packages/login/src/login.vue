<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:34:11
 * @LastEditTime: 2020-12-07 16:55:03
-->
<template>
  <div>
    login 组件
    <p>{{list}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
export default defineComponent({
  name: "login",
  setup() {
    const data = reactive({
      list: [1,2,3,4,5]
    })

    return {
      ...toRefs(data)
    }
  }
});
</script>

<style></style>

<!--
 * @Description: 多屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-07 15:31:24
 * @LastEditTime: 2020-12-09 14:33:48
-->
<template>
  <div id="multi-viewer-container" ref="container">
    <panorama-viewer
      :class="`viewer${index + 1}`"
      :style="`grid-area:viewer${index + 1}`"
      v-for="(item, index) in viewerTitleArray"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MultiPanoramaViewer",
  props: {
    viewerTitleArray: Array,
  },
  setup() {
    console.log(">>>>>");
  },
});
</script>

<style>
#multi-viewer-container {
  display: grid;
  height: 100%;
  width: 100%;
}
</style>

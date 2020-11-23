<!--
 * @Description: psv-demo
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-11-23 10:54:36
-->
<template>
  <div id="viewer"></div>
</template>

<script lang="ts">
/// <reference path="../../../declaration.d.ts" />
import { Viewer } from "photo-sphere-viewer";
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  data() {
    return {
      url: "123"
    }
  },
  setup() {
    onMounted(() => {
      const viewer = new Viewer({
        container: document.querySelector("#viewer"),
        panorama: "https://i.carimg.com//zf/0/290/043/597/000/1597043290/15970432906ABYwo.jpg",
      });
      console.log(viewer);
    });
  },
});
</script>

<style scoped lang="scss">
@import "~photo-sphere-viewer/dist/photo-sphere-viewer.css";
#viewer {
  width: 100vw;
  height: 100vh;
}
</style>

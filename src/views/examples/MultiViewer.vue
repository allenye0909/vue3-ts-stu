<!--
 * @Description: xxx
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-12-09 09:44:59
 * @LastEditTime: 2020-12-09 14:43:03
-->
<template>
  <div class="example">
    <multi-panorama-viewer
      :viewerTitleArray="viewerTitleArray"
      class="showThreeViewer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return {
      viewerTitleArray: [
        {
          name: "test1",
          top: 20,
          left: 20,
          isPc: true,
          fullscreenState: false,
        },
        {
          name: "test2",
          top: 20,
          left: 20,
          isPc: true,
          fullscreenState: false,
        },
        {
          name: "test3",
          top: 20,
          left: 20,
          isPc: true,
          fullscreenState: false,
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.example {
  width: 100%;
  height: 100%;
}
.showThreeViewer {
  grid-template-columns: 38.2% 61.8%;
  grid-template-rows: 50% 50%;
  grid-template-areas: "viewer1 viewer3" "viewer2 viewer3";
  // grid-gap: 1px;
  width: 100vw;
  height: 100vh;
}
.showTwoViewer {
  grid-template-rows: 50% 50%;
  grid-template-rows: 50% 50% 0%;
  grid-template-areas: "viewer1 viewer3" "viewer1 viewer3" "viewer2 viewer2";
  // grid-gap: 1px;
  width: 100vw;
  height: 100vh;
}
</style>

<!--
 * @Description: 单屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-11-24 11:26:51
-->
<template>
  <div class="single-view-container" style="position: relative;">
    <div id="viewer" ref="refViewer"></div>
  </div>
</template>

<script lang="ts">
/// <reference path="../../../declaration.d.ts" />
import { Viewer } from "photo-sphere-viewer";
import { defineComponent, onMounted, ref, toRefs, reactive } from "vue";
let viewer: any;
export default defineComponent({
  setup(props, context) {
    let refViewer = ref(null);
    const data = reactive({});

    function initViewer() {
      const config = {
        container: refViewer.value,
        panorama:
          "https://i.carimg.com//zf/0/290/043/597/000/1597043290/15970432906ABYwo.jpg",
      };

      viewer = new Viewer(config);
      initViewerEvent(props, context, viewer);
    }

    onMounted(() => {
      initViewer();
    });

    return {
      refViewer,
      ...toRefs(data),
    };
  },
});
function initViewerEvent(props: any, context: any, viewer: any): void {
  viewer.on("position-updated", (e: any, position: any): void => {
    context.emit("positionUpdated", position);
  });

  viewer.on("zoom-updated", (e: any, zoomLevel: any): void => {
    context.emit("zoomUpdated", zoomLevel, viewer.getPosition());
  });
}
</script>

<style lang="scss">
@import "~photo-sphere-viewer/dist/photo-sphere-viewer.css";
.single-view-container {
  height: 100%;
  width: 100%;
  #viewer {
    height: 100%;
    width: 100%;
    .psv-navbar {
      bottom: -40px !important;
    }
  }
}
</style>

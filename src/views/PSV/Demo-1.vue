<!--
 * @Description: 单屏组件
 * @Author: allenye
 * @Email: allenye@aliyun.com
 * @Date: 2020-11-23 09:53:40
 * @LastEditTime: 2020-11-30 09:16:16
-->
<template>
  <div class="single-view-container" style="position: relative;">
    <div id="viewer" ref="refViewer"></div>
  </div>
</template>

<script lang="ts">
/// <reference path="../../../declaration.d.ts" />
import { Viewer } from "photo-sphere-viewer";
import MarkersPlugins from "photo-sphere-viewer/dist/plugins/markers";

import { setID } from "../../utils/psv";
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
        plugins: [[MarkersPlugins]],
      };

      viewer = new Viewer(config);
      viewer._id = setID();
      // console.log(viewer);
      initViewerEvent(props, context, viewer);
    }

    onMounted(() => {
      initViewer();
    });

    return {
      refViewer,
      ...toRefs(data),
      addMarker,
    };
  },
});
function initViewerEvent(props: any, context: any, viewer: any): void {
  viewer.on("position-updated", (e: any, position: any): void => {
    context.emit("positionUpdated", position, viewer._id);
  });

  viewer.on("zoom-updated", (e: any, zoomLevel: any): void => {
    context.emit("zoomUpdated", zoomLevel, viewer._id);
  });

  viewer.on("click", (target: any): void => {
    context.emit("handleClick", target, MarkersPlugins);
  });

  viewer.on("dblclick", (target: any): void => {
    context.emit("handleDblClick", target, MarkersPlugins);
  });

  viewer.on("select-marker", (marker: any, dblclick: any): void => {
    context.emit("selectMarker", marker, dblclick);
  });
}
function addMarker({ id, latitude, longitude, tooltip }: any) {
  const markersPlugin = viewer.getPlugin(MarkersPlugins);
  markersPlugin.addMarker({
    id,
    longitude,
    latitude,
    tooltip,
    // image: require("../../assets/img/marker.gif"),
    image: "http://photo-sphere-viewer.js.org/assets/pin-blue.png",
    // 原图 宽高比 7.8:3
    width: 78,
    height: 30,
    style: {
      cursor: "pointer",
      backgroundPosition: "center bottom",
    },
    anchor: "center 48%",
  });
}
</script>

<style lang="scss">
@import "~photo-sphere-viewer/dist/photo-sphere-viewer.css";
@import "~photo-sphere-viewer/dist/plugins/markers.css";
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
